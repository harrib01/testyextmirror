import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createCtx } from "src/common/createCtx";
import { SearchHeadless, useSearchActions, useSearchState, Matcher, SelectableStaticFilter, Result } from "@yext/search-headless-react";
import { Map, useMapContext } from "@yext/pages/components";
import { GoogleMaps } from "@yext/components-tsx-maps";
import SearchBox from "src/components/search/SearchBox"
import LocatorCard from "src/components/cards/LocatorCard";
import ResultSummary from "src/components/search/ResultSummary";
import ResultList from "src/components/search/ResultList";
import CustomMarker from "src/components/search/CustomMarker";
import LoadingSpinner from "src/components/common/LoadingSpinner";
import { useBreakpoint } from "src/common/useBreakpoints";
import { useLoadInitialSearchParams, useUpdateFacetParams } from "src/components/search/utils/handleSearchParams";
import { useGetSearchResults } from "src/components/search/utils/useGetSearchResults";
import "src/components/search/Locator.css";
import c from "classnames";
import { BsXLg } from "react-icons/bs";
import { executeSearch, StandardFacets, getUserLocation } from "@yext/search-ui-react";
import { facet_config } from "src/components/search/utils/handleSearchParams";
import { displayActiveFilers } from "src/components/search/ResultSummary";
import togglePin from "src/assets/images/togglePin.svg";
import toggleList from "src/assets/images/toggleList.svg";
import { Coordinate } from "@yext/types";
import { GEOLOCATE_RADIUS, LOCATOR_STATIC_FILTER_FIELD } from 'src/config';
import TileFacet from "./Filters/TileFacet";
import type { Address, Hours } from "@yext/types";
import { LocationProfile } from "src/types/entities";

export type LocatorContextType = {
  selectedId: string,
  setSelectedId: (id: string) => void,
  focusedId: string,
  setFocusedId: (id: string) => void,
  hoveredId: string,
  setHoveredId: (id: string) => void,
}

// Setup LocatorProvider to pass the [selected, hovered, focused]Ids between Marker interactions and LocatorCard interactions
export const [useLocatorContext, LocatorProvider] = createCtx<LocatorContextType>();

type LocatorProps = {
  // Will display results up to the verticalLimit (default 20, change with searchActions.setVerticalLimit(num))
  displayAllOnNoResults?: boolean,
  placeholderText?: string,
  subTitle: string,
  title: string,
  description: string,
}

function enableScroll() {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
}

export default function Locator(props: LocatorProps) {
  const { displayAllOnNoResults = false, placeholderText, subTitle, title, description } = props;
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [focusedEntityId, setFocusedEntityId] = useState("");
  const [hoveredEntityId, setHoveredEntityId] = useState("");

  const searchActions = useSearchActions();
  searchActions.setVerticalLimit(50);
  searchActions.setLocationRadius(1609 * GEOLOCATE_RADIUS); // This takes radius in meters
  const searchState = useSearchState(state => state);
  const isLoading = useSearchState(state => state.searchStatus.isLoading);
  const isDesktopBreakpoint = useBreakpoint("sm");
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);

  const toggleListSVG = (
    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 0.333496C1.70333 0.333496 1.41332 0.42147 1.16665 0.586292C0.919972 0.751114 0.727713 0.985382 0.614181 1.25947C0.50065 1.53356 0.470945 1.83516 0.528823 2.12613C0.586701 2.4171 0.729562 2.68438 0.939341 2.89416C1.14912 3.10394 1.41639 3.2468 1.70737 3.30467C1.99834 3.36255 2.29994 3.33285 2.57403 3.21932C2.84812 3.10578 3.08238 2.91353 3.24721 2.66685C3.41203 2.42018 3.5 2.13017 3.5 1.8335C3.5 1.43567 3.34197 1.05414 3.06066 0.772836C2.77936 0.491531 2.39783 0.333496 2 0.333496ZM2 5.3335C1.70333 5.3335 1.41332 5.42147 1.16665 5.58629C0.919972 5.75111 0.727713 5.98538 0.614181 6.25947C0.50065 6.53356 0.470945 6.83516 0.528823 7.12613C0.586701 7.4171 0.729562 7.68438 0.939341 7.89416C1.14912 8.10394 1.41639 8.2468 1.70737 8.30468C1.99834 8.36255 2.29994 8.33285 2.57403 8.21932C2.84812 8.10579 3.08238 7.91353 3.24721 7.66685C3.41203 7.42018 3.5 7.13017 3.5 6.8335C3.5 6.43567 3.34197 6.05414 3.06066 5.77284C2.77936 5.49153 2.39783 5.3335 2 5.3335ZM2 10.3335C1.70333 10.3335 1.41332 10.4215 1.16665 10.5863C0.919972 10.7511 0.727713 10.9854 0.614181 11.2595C0.50065 11.5336 0.470945 11.8352 0.528823 12.1261C0.586701 12.4171 0.729562 12.6844 0.939341 12.8942C1.14912 13.1039 1.41639 13.2468 1.70737 13.3047C1.99834 13.3626 2.29994 13.3328 2.57403 13.2193C2.84812 13.1058 3.08238 12.9135 3.24721 12.6669C3.41203 12.4202 3.5 12.1302 3.5 11.8335C3.5 11.4357 3.34197 11.0541 3.06066 10.7728C2.77936 10.4915 2.39783 10.3335 2 10.3335ZM16 10.8335H6C5.86739 10.8335 5.74022 10.8862 5.64645 10.9799C5.55268 11.0737 5.5 11.2009 5.5 11.3335V12.3335C5.5 12.4661 5.55268 12.5933 5.64645 12.6871C5.74022 12.7808 5.86739 12.8335 6 12.8335H16C16.1326 12.8335 16.2598 12.7808 16.3536 12.6871C16.4473 12.5933 16.5 12.4661 16.5 12.3335V11.3335C16.5 11.2009 16.4473 11.0737 16.3536 10.9799C16.2598 10.8862 16.1326 10.8335 16 10.8335ZM16 0.833496H6C5.86739 0.833496 5.74022 0.886175 5.64645 0.979943C5.55268 1.07371 5.5 1.20089 5.5 1.3335V2.3335C5.5 2.4661 5.55268 2.59328 5.64645 2.68705C5.74022 2.78082 5.86739 2.8335 6 2.8335H16C16.1326 2.8335 16.2598 2.78082 16.3536 2.68705C16.4473 2.59328 16.5 2.4661 16.5 2.3335V1.3335C16.5 1.20089 16.4473 1.07371 16.3536 0.979943C16.2598 0.886175 16.1326 0.833496 16 0.833496V0.833496ZM16 5.8335H6C5.86739 5.8335 5.74022 5.88618 5.64645 5.97994C5.55268 6.07371 5.5 6.20089 5.5 6.3335V7.3335C5.5 7.46611 5.55268 7.59328 5.64645 7.68705C5.74022 7.78082 5.86739 7.8335 6 7.8335H16C16.1326 7.8335 16.2598 7.78082 16.3536 7.68705C16.4473 7.59328 16.5 7.46611 16.5 7.3335V6.3335C16.5 6.20089 16.4473 6.07371 16.3536 5.97994C16.2598 5.88618 16.1326 5.8335 16 5.8335Z" fill="#C59617" />
    </svg>
  )

  const togglePin = (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.38337 15.6772C0.842812 9.09472 0 8.41915 0 6C0 2.68628 2.68628 0 6 0C9.31372 0 12 2.68628 12 6C12 8.41915 11.1572 9.09472 6.61662 15.6772C6.31865 16.1076 5.68131 16.1076 5.38337 15.6772ZM6 8.5C7.38072 8.5 8.5 7.38072 8.5 6C8.5 4.61928 7.38072 3.5 6 3.5C4.61928 3.5 3.5 4.61928 3.5 6C3.5 7.38072 4.61928 8.5 6 8.5Z" fill="#C59617" />
    </svg>
  )

  async function autoGeolocate() {
    const position = await getUserLocation();

    searchActions.setStaticFilters([{
      displayName: "My Location",
      selected: true,
      filter: {
        kind: 'fieldValue',
        fieldId: LOCATOR_STATIC_FILTER_FIELD,
        matcher: Matcher.Near,
        value: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          radius: 1609 * GEOLOCATE_RADIUS
        },
      }
    }]);
    await searchActions.executeVerticalQuery();
  }

  if (!initialParamsLoaded && searchParams.get('qp') == null) {
    autoGeolocate();
  }
  const [currentOffset, setCurrentOffset] = useState(0);
  // Load static and facet filters on page load.
  useLoadInitialSearchParams(searchActions, searchParams, setSearchParams, () => setInitialParamsLoaded(true));
  // Update the facet url params whenever the search state facets object updates.
  useUpdateFacetParams(searchActions, searchParams, setSearchParams);

  // Unset any selected, hovered, or focused markers on new search
  useEffect(() => {
    setSelectedEntityId("");
    setFocusedEntityId("");
    setHoveredEntityId("");
  }, [searchActions.state.query.queryId]);

  const [filterOpen, setFilterOpen] = useState(false);
  const filters = searchActions.state.filters.facets;
  const activeFacets = filters?.filter(facet => facet.options.filter(f => f.selected).length);
  const [mapOpen, setMapOpen] = useState(false);
  const selectedFilter = useSearchState(s => s.filters.static)?.find(filter => filter.selected);

  const results = searchState.vertical.results?.map(r => ({
    coordinate: r.rawData.yextDisplayCoordinate as Coordinate,
    id: r.id as string,
    type: r.rawData.c_cambriaType as string,
    address: r.rawData.address as Address,
    hours: r.rawData.hours as Hours,
    name: r.rawData.name as string,
    slug: r.rawData.slug as string,
    salesforce: r.rawData.c_salesforceCommunitiesSchedulerURL as string,
    regionId: r.rawData.c_salesRegionID as string,
    regionName: r.rawData.c_salesName as string,
    category: r.rawData.c_customCategory as string[],
  })) || [];

  const currentRenderedResults = [...results.slice(0, currentOffset), ...results.slice(currentOffset, currentOffset + 10)];

  const renderFilterOptions = () =>
    <div className="Locator-filterCard">
      <div className="border-b-[1px] pb-4 sm:pb-0 mb-4">
        <div className="Heading Heading--sub sm:pb-4 text-brand-primary flex justify-between uppercase tracking-[1.7px]">
          Refine Your Search
          <button>
            <BsXLg onClick={() => { setFilterOpen(!filterOpen), enableScroll() }} />
          </button>
        </div>
        {!isDesktopBreakpoint && (
          <div className="flex flex-wrap">
            {activeFacets && activeFacets.map(curr =>
              displayActiveFilers(curr, searchActions)
            )}
          </div>
        )}
      </div>
      <div className="Locator-filterContent font-primary">
        <TileFacet fieldId="c_locationType" displayName="Location Type" resultLength={results.length} />
        <TileFacet fieldId="c_features" displayName="features" resultLength={results.length} />
        <TileFacet fieldId="c_designType" displayName="Designs on Display" resultLength={results.length} />
        <div className="hidden">
          <TileFacet fieldId="c_cambriaType" displayName="cambria type" resultLength={results.length} />
        </div>
        <div className="hidden">
          <TileFacet fieldId="c_webType" displayName="web type" resultLength={results.length} />
        </div>
        <div className="hidden">
          <TileFacet fieldId="c_locationStatus" displayName="location status" resultLength={results.length} />
        </div>
      </div>
      <button className="Link Link--underline font-medium text-brand-primary tracking-[0.7px] pt-4 uppercase text-[14px] leading[17px]" onClick={() => resetFacets(searchActions)}>
        Clear All
      </button>
    </div>
    ;

  return (
    <LocatorProvider value={{
      selectedId: selectedEntityId,
      setSelectedId: setSelectedEntityId,
      focusedId: focusedEntityId,
      setFocusedId: setFocusedEntityId,
      hoveredId: hoveredEntityId,
      setHoveredId: setHoveredEntityId,
    }}>
      <div className="border-b border-brand-gray-200">
        <div className="container my-6 md:my-[40px] flex flex-col md:w-[70%]">
          <h1 className="Heading--locator mb-4 text-center tracking-[1.7px] uppercase font-thin">
            {title}
          </h1>
          <h2 className="text-[16px] leading-[24px] md:text-[18px] md:leading-[24px] font-light text-left md:text-center font-secondary">
            {description}
          </h2>
        </div>
      </div>
      <div className="Locator relative">
        {(!initialParamsLoaded || isLoading) && <LoadingSpinner />}
        <div className="Locator-content">
          <SearchBox
            subTitle={subTitle}
            placeholderText={placeholderText}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            showPins={results.length != 0}
            setCurrentOffset={setCurrentOffset}
          />
          <div className="Locator-resultsWrapper">
            <ResultSummary
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              searchActions={searchActions}
              hasResults={results.length}
              currentOffset={currentOffset}
            />

            {(!isDesktopBreakpoint && mapOpen) || results.length != 0 && (
              <ResultList
                CardComponent={LocatorCard}
                displayAllOnNoResults={displayAllOnNoResults}
                currentOffset={currentOffset}
                setCurrentOffset={setCurrentOffset}
              />
            )}
          </div>
        </div>
        {!isDesktopBreakpoint && (
          <div className={c({ 'fixed pt-6 md:pt-0 w-full md:w-1/2 visible pl-0 md:pl-5': filterOpen }) + "hidden Locator-popupMobile"}>
            {renderFilterOptions()}
          </div>
        )}
        {!isDesktopBreakpoint && results.length != 0 && !filterOpen && !mapOpen && (
          <button className={c({ ' ': filterOpen }) + " Locator-toggleMobile text-brand-primary flex gap-2"} onClick={() => setMapOpen(!mapOpen)}>
            <span className="my-auto">{togglePin}</span>
            MAP
          </button>
        )}
        {!isDesktopBreakpoint && results.length != 0 && !filterOpen && mapOpen && (
          <button className={c({ ' ': filterOpen }) + " Locator-toggleMobile text-brand-primary flex gap-2"} onClick={() => setMapOpen(!mapOpen)}>
            <span className="my-auto">{toggleListSVG}</span>
            LIST
          </button>
        )}
        {(isDesktopBreakpoint || (!isDesktopBreakpoint && !filterOpen && mapOpen)) && (
          <div className="Locator-map relative">
            <Map
              provider={GoogleMaps}
              providerOptions={{ draggable: true }}
              clientKey="gme-yextinc"
              bounds={currentRenderedResults.length ? currentRenderedResults.map(data => data.coordinate) : undefined}
              padding={{ top: 20, bottom: 20, left: 50, right: 50 }}
              className="h-full"
            >
              {currentRenderedResults.reverse().map((data, index) => (
                <CustomMarker
                  key={data.id}
                  coordinate={data.coordinate}
                  id={data.id}
                  index={currentRenderedResults.length - index}
                  type={data.type}
                  address={data.address}
                  hours={data.hours}
                  name={data.name}
                  slug={data.slug}
                  salesforce={data.salesforce}
                  regionId={data.regionId}
                  regionName={data.regionName}
                  category={data.category}
                />
              ))}
              <button
                className={c({ 'hidden ': currentOffset >= 40 || (results.length < currentOffset + 10) }) + "Button Button--secondary absolute left-1/2 -translate-x-1/2 bottom-[30px]"}
                onClick={() => setCurrentOffset(currentOffset => currentOffset + 10)}
              >
                Show More
              </button>
            </Map>
            {isDesktopBreakpoint && (
              <div className={c({ 'absolute pt-6 w-full md:w-[390px] visible pl-0 md:pl-5 shadow-nearby-card flex': filterOpen }) + "hidden Locator-popup"}>
                {renderFilterOptions()}
              </div>
            )}
          </div>
        )}
      </div>
    </LocatorProvider>
  );
}

const resetFacets = (searchActions: SearchHeadless) => {
  searchActions.resetFacets();
  executeSearch(searchActions);
}    