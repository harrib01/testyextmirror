import { FilterSearch, StandardFacets, executeSearch } from "@yext/search-ui-react";
import GeolocateButton from "./GeolocateButton";
import { LOCATOR_STATIC_FILTER_FIELD, LOCATOR_ENTITY_TYPE } from "src/config";
import { useSearchActions } from "@yext/search-headless-react";
import type { URLSearchParamsInit } from "react-router-dom";
import { checkIsLocationFilter } from "src/components/search/utils/checkIsLocationFilter";
import { facet_config, locationFilterToType } from "src/components/search/utils/handleSearchParams";
import { Dispatch, SetStateAction, useState } from "react";
import c from "classnames";
import "src/components/search/SearchBox.css";
import { addToDatalayer } from "src/components/common/GTMhelper";
import { isProduction } from "@yext/pages/util";

const searchFields = [
  { fieldApiName: LOCATOR_STATIC_FILTER_FIELD, entityType: LOCATOR_ENTITY_TYPE },
];

type SearchBoxProps = {
  subTitle: string;
  placeholderText?: string;
  searchParams: URLSearchParams,
  setCurrentOffset: Dispatch<SetStateAction<number>>,
  setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: {
    replace?: boolean | undefined;
    state?: any;
  } | undefined) => void;
  showPins: boolean;
}

export default function SearchBox(props: SearchBoxProps) {
  const {
    subTitle,
    placeholderText,
    searchParams,
    showPins,
    setSearchParams,
    setCurrentOffset
  } = props;

  const searchActions = useSearchActions();
  const [goldPin, goldPinOpen] = useState(false);
  const [blackPin, blackPinOpen] = useState(false);

  const pin2SVG = (
    <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8408 1.10864C14.9921 1.10864 16.9398 1.98065 18.3497 3.3905C19.7595 4.80034 20.6315 6.74803 20.6315 8.89938C20.6315 11.8038 18.0159 17.2049 12.8404 25.1086C7.66533 17.2043 5.05005 11.8036 5.05005 8.89938C5.05005 6.74803 5.92206 4.80034 7.3319 3.3905C8.74175 1.98065 10.6894 1.10864 12.8408 1.10864Z" fill="black" stroke="#4C4C4C" />
    </svg>
  );

  const pin1SVG = (
    <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0407 1.10864C14.1921 1.10864 16.1398 1.98065 17.5496 3.3905C18.9595 4.80034 19.8315 6.74803 19.8315 8.89938C19.8315 11.8038 17.2159 17.2049 12.0403 25.1086C6.86528 17.2043 4.25 11.8036 4.25 8.89938C4.25 6.74803 5.12201 4.80034 6.53185 3.3905C7.9417 1.98065 9.88938 1.10864 12.0407 1.10864Z" fill="#C59617" stroke="#4C4C4C" />
    </svg>
  );

  const pin3SVG = (
    <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0407 1.10864C14.1921 1.10864 16.1398 1.98065 17.5496 3.3905C18.9595 4.80034 19.8315 6.74803 19.8315 8.89938C19.8315 11.8038 17.2159 17.2049 12.0403 25.1086C6.86528 17.2043 4.25 11.8036 4.25 8.89938C4.25 6.74803 5.12201 4.80034 6.53185 3.3905C7.9417 1.98065 9.88938 1.10864 12.0407 1.10864Z" fill="white" stroke="#4C4C4C" />
    </svg>
  );

  const mapPins =
    [{ text: 'Cambria Gallery / Showroom', label: <span className="mr-3">{pin2SVG}</span> },
    { text: 'Premier Partner', label: <span className="mr-3">{pin1SVG}</span> },
    { text: 'Authorized Sellers', label:  <span className="mr-3">{pin3SVG}</span> }
    ];

  const searchIcon = (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8898 15.158L11.8588 11.127C11.7869 11.0551 11.6932 11.0176 11.5932 11.0176H11.2713C12.3431 9.85829 12.9994 8.31149 12.9994 6.60845C12.9994 3.018 10.0901 0.108765 6.49968 0.108765C2.90923 0.108765 0 3.018 0 6.60845C0 10.1989 2.90923 13.1081 6.49968 13.1081C8.20272 13.1081 9.74952 12.4519 10.9088 11.3832V11.7019C10.9088 11.8019 10.9495 11.8957 11.0182 11.9676L15.0493 15.9986C15.1961 16.1455 15.4336 16.1455 15.5805 15.9986L15.8898 15.6893C16.0367 15.5424 16.0367 15.3049 15.8898 15.158ZM6.49968 12.1082C3.45921 12.1082 0.999951 9.64892 0.999951 6.60845C0.999951 3.56797 3.45921 1.10872 6.49968 1.10872C9.54016 1.10872 11.9994 3.56797 11.9994 6.60845C11.9994 9.64892 9.54016 12.1082 6.49968 12.1082Z" fill="#C59617" />
    </svg>
  );

  return (
    <div className="border-b border-brand-gray-200 p-6">
      <div className="mb-2 text-brand-gray-300 font-secondary text-[14px] leading-[22px] font-light">
        {subTitle}
      </div>
      <div className="flex items-center">
        <div className="relative w-full h-[54px] text-brand-gray-500 border border-brand-gray-200 flex items-center bg-white pr-2">
          <FilterSearch
            customCssClasses={{
              filterSearchContainer: "mb-0 grow font-secondary",
              inputElement: "p-3 h-auto rounded-none border-0 font-secondary",
            }}
            label=""
            placeholder={placeholderText}
            searchFields={searchFields}
            onSelect={({
              executeFilterSearch,
              newDisplayName,
              newFilter,
              setCurrentFilter,
            }) => {
              // Currently on load this component won't recognize a filter set from the url params when a
              // "builtin.region" or "address.countryCode" filter is being used since it only checks "builtin.location".

              // Unselect selected matching filters.
              const matchingFilters = searchActions.state.filters.static?.filter(({ filter, selected }) =>
                selected
                && filter.kind === "fieldValue"
                && (LOCATOR_STATIC_FILTER_FIELD === "builtin.location" ? checkIsLocationFilter(filter) : searchFields.some(s => s.fieldApiName === filter.fieldId))
              ) ?? [];
              matchingFilters.forEach(f => searchActions.setFilterOption({ filter: f.filter, selected: false }));

              // Update the static filter state with the new filter.
              searchActions.setFilterOption({
                filter: newFilter,
                displayName: newDisplayName,
                selected: true
              });
              setCurrentFilter(newFilter);
              executeFilterSearch(newDisplayName);

              // Update URLSearchParams.
              searchParams.set('q', newFilter.value.toString());
              searchParams.set('qp', newDisplayName);

              // For builtin.location we need to also indicate the type of filter being used so it can be loaded in correctly.
              let datalayerURL = '?q=' + newFilter.value.toString() + '&qp=' + (newDisplayName).replaceAll(' ', '+').replaceAll(',', '%2C');
              if (checkIsLocationFilter(newFilter)) {
                const locationType = locationFilterToType(newFilter.fieldId);
                searchParams.set('location_type', locationType);
                datalayerURL = datalayerURL + '&location_type=location';
              }

              setSearchParams(searchParams);

              // push to datalayer
              addToDatalayer(
                {
                  'event': 'dealer-locator_search_submit',
                  'dealer-locator_search_name': newDisplayName,
                  'dealer-locator_search_query': datalayerURL,
                  'dealer-locator_search_path': isProduction(window.location.hostname) ? 'https://cambriausa.com/dealer-locator' + datalayerURL : 'https://devtrunk-www-cambriausa-com-pagescdn-com.preview.pagescdn.com' + datalayerURL,
                });

              // Run new search with updated filter
              setCurrentOffset(0);
              searchActions.setOffset(0);
              // searchActions.resetFacets();  // keep the same active filter for a new search
              executeSearch(searchActions);
            }}
          />
          <span className="m-3 mr-2 w-4">
            {searchIcon}
          </span>
        </div>
        <GeolocateButton
          className="ml-4"
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      {showPins && (
        <div className="pt-6 flex flex-wrap gap-4">
          {/* {mapPins.map(pin => (
            <div className="flex min-w-[130px] md:min-w-[160px]">
              {pin.label}
              <span className="font-secondary text-[14px] font-light">
                {pin.text}
              </span>
            </div>
          ))} */}
          {/* Remove the hover content on the pins for now - may add different content at a later date */}
          <div className="relative">
            <div className="flex min-w-[130px] md:min-w-[160px]" 
              onMouseOver={() => goldPinOpen(!goldPin)}
              onMouseOut={() => goldPinOpen(!goldPin)}
              >
              {mapPins[0].label}
              <span className="font-secondary text-[14px] font-light">
              {mapPins[0].text}
              </span>
            </div>
            <div  className={c(
                {'hidden ' : !goldPin},
                "SearchBox-mappin absolute bg-white z-10 font-secondary text-[12px] font-light"
                )}>
                Meet with a Cambria expert to view full size slabs, collaborate on your project, and discuss next steps in the purchasing process.
            </div>
          </div>
          <div className="relative">
            <div className="flex min-w-[130px] md:min-w-[160px]"
              onMouseOver={() => blackPinOpen(!blackPin)}
              onMouseOut={() => blackPinOpen(!blackPin)}>
              {mapPins[1].label}
              <span className="font-secondary text-[14px] font-light">
              {mapPins[1].text}
              </span>
            </div>
            <div  className={c(
                  {'hidden ' : !blackPin},
                  "SearchBox-mappin absolute bg-white z-10 font-secondary text-[12px] font-light"
                  )}>
                Our Premier Partners are dedicated to providing you the best Cambria experience from start to finish.
            </div>
          </div>
          <div className="flex min-w-[130px] md:min-w-[160px]">
            {mapPins[2].label}
            <span className="font-secondary text-[14px] font-light">
            {mapPins[2].text}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
