import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useSearchState, SearchHeadless, DisplayableFacet, DisplayableFacetOption } from "@yext/search-headless-react";
import type { State } from "@yext/search-headless-react";
import { LOCATOR_STATIC_FILTER_FIELD } from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import { checkIsLocationFilter } from "src/components/search/utils/checkIsLocationFilter";
import { useBreakpoint } from "src/common/useBreakpoints";
import c from "classnames";
import { BsXLg } from "react-icons/bs";
import { executeSearch } from "@yext/search-ui-react";

function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
}

export interface ResultSummaryProps {
  filterOpen: boolean,
  setFilterOpen: Dispatch<SetStateAction<boolean>>,
  searchActions: SearchHeadless,
  hasResults: number,
  currentOffset: number;
}

export default function ResultSummary(props: ResultSummaryProps) {
  const { filterOpen, setFilterOpen, searchActions, currentOffset } = props;
  const searchState = useSearchState(state => state);
  const { relativePrefixToRoot } = useTemplateData();
  const [searchMade, setSearchMade] = useState(false);
  const resultsText = useMemo(() => getResultsCountText(searchState), [searchState]);

  const filterSVG = (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.22222 11.4421H9.77778V9.66428H6.22222V11.4421ZM0 0.775391V2.55317H16V0.775391H0ZM2.66667 6.99761H13.3333V5.21983H2.66667V6.99761Z" fill="#C59617" />
    </svg>
  );

  // Element to render for results summary when page is first loaded before a search is made.
  const ititialSummaryText = (
    <span>
      Use our locator to find a location near you.
    </span>
  );

  const facetFilters = searchActions.state.filters.facets;
  const activeFacets = facetFilters?.filter(facet => facet.options.filter(f => f.selected).length);
  // Check if a search has been made in order to conditionally render ititialSummaryText.
  if (!searchMade && searchState.query.queryId && !searchState.searchStatus.isLoading) {
    setSearchMade(true);
  }

  const isDesktopBreakpoint = useBreakpoint("sm");
  const renderFilterText = () =>
    activeFacets ? (
      <span className="text-brand-primary hover:underline">Filter ({countActiveFilters(activeFacets)})</span>
    ) : (
      <span className="text-brand-primary hover:underline">Filter</span>
    );

  return (
    <div className={c({ 'border-b border-brand-gray-200 ': props.hasResults != 0 }) + "py-4 px-6 text-brand-gray-300 font-secondary text-[16px] leading-[24px] font-light"}>
      <div className="flex justify-between">
        {props.hasResults != 0 && searchState?.vertical?.results?.length && (
          <span>
            {searchMade ? ('1-' + (currentOffset + 10 > props.hasResults ? props.hasResults : (currentOffset + 10)) + ' of ' + searchState?.vertical?.results?.length + ' locations found') : ititialSummaryText}
          </span>
        )}
        {props.hasResults == 0 && (
          <span>
            {searchMade ? 'No Locations Found' : ititialSummaryText}
          </span>
        )}
        {props.hasResults != 0 && (
          <div className="">
            {isDesktopBreakpoint ? (
              <button className="flex" onClick={() => { setFilterOpen(!filterOpen) }}>
                {renderFilterText()}
                <span className="ml-2 w-[14px] h-[10px] my-auto">
                  {filterSVG}
                </span>
              </button>
            ) : (
              <button className="flex" onClick={() => { setFilterOpen(!filterOpen), disableScroll() }}>
                {renderFilterText()}
                <span className="ml-2 w-[14px] h-[10px] my-auto">
                  {filterSVG}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap">
        {activeFacets && activeFacets.map(curr => {
          if (curr.fieldId == 'c_locationType' || curr.fieldId == 'c_designType' || curr.fieldId == 'c_features') {
            return (
              displayActiveFilers(curr, searchActions)
            )
          }
        })}
      </div>
    </div>
  );
}

export function displayActiveFilers(curr: DisplayableFacet, searchActions: SearchHeadless) {
  const displayName = curr.displayName;
  return (
    <div className="flex flex-wrap">
      {curr.options.filter(f => f.selected).map(f => {
        if (f.displayName != "Showroom Displays" && f.displayName != "Sample Towers" && f.displayName != "Slab Displays") {
          return (
            <button className="p-2 bg-brand-gray-400 mr-2 rounded-3xl text-brand-gray-300 flex mt-2 hover:bg-brand-gray-100" onClick={() => uncheckFacet(curr, searchActions, f)}>
              <BsXLg className="my-auto mr-2 w-[9px]" />
              <span className="whitespace-nowrap text-[14px] leading-[22px] font-secondary font-light">{f.displayName}</span>
            </button>
          )
        }
      }
      )}
    </div>
  );
}

function uncheckFacet(curr: DisplayableFacet, searchActions: SearchHeadless, f: DisplayableFacetOption) {
  const index = curr.options.indexOf(f);
  searchActions.setFacetOption(curr.fieldId, curr.options[index], false);
  executeSearch(searchActions);
}

function countActiveFilters(activeFacets: DisplayableFacet[]) {
  let num = 0;
  activeFacets.forEach(curr => {
    {
      curr.options.filter(f => f.selected).map(f =>
        num++
      )
    }
  });
  return num;
}

function getResultsCountText(state: State) {
  let searchPlace = "";
  const resultsCount = state.vertical.results?.length ?? 0;

  if (state.filters.static?.length) {
    // Make sure to get the match to the correct filter in case multiple are set.
    const activeFilter = state.filters.static.find(f =>
      f.selected
      && f.filter.kind === 'fieldValue'
      // If the locator is searching on "builtin.location", check if the selected filter is also a location filter.
      // Otherwise just match the locator filter fieldId to the selected filter fieldId.
      && (LOCATOR_STATIC_FILTER_FIELD === "builtin.location" ? checkIsLocationFilter(f.filter) : LOCATOR_STATIC_FILTER_FIELD === f.filter.fieldId)
      && f.displayName
    ) ?? null;
    if (activeFilter && activeFilter.displayName) {
      searchPlace = activeFilter.displayName;
    }
  }

  if (searchPlace) {
    if (resultsCount === 0) {
      return `No locations found near "${searchPlace}".`;
    }
    if (resultsCount === 1) {
      return `${resultsCount} location near "${searchPlace}".`;
    }
    return `${resultsCount} locations near "${searchPlace}".`;
  }

  if (resultsCount === 0) {
    return `No locations found.`;
  }
  if (resultsCount === 1) {
    return `${resultsCount} location found.`
  }
  return `${resultsCount} locations found.`;
}
