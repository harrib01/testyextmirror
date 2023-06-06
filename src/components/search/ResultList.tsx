import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { useSearchState } from "@yext/search-headless-react";
import type { CardComponent } from "@yext/search-ui-react";
import type { Result } from "@yext/search-headless-react";
import { useLocatorContext } from "src/components/search/Locator";
import type { LocatorCardProps } from "src/components/cards/LocatorCard";
import "src/components/search/ResultList.css";
import c from "classnames";
import { AnalyticsScopeProvider } from "@yext/pages/components";

interface ResultListProps extends LocatorCardProps {
  CardComponent: CardComponent,
  displayAllOnNoResults?: boolean,
  currentOffset: number;
  setCurrentOffset: Dispatch<SetStateAction<number>>;
}

export default function ResultList(props: ResultListProps) {
  const { CardComponent, displayAllOnNoResults, currentOffset, setCurrentOffset } = props;

  const verticalResults = useSearchState(state => state.vertical.results) || [];
  const allResultsForVertical = useSearchState(state => state.vertical?.noResults?.allResultsForVertical.results) || [];
  let results = verticalResults;
  if (verticalResults.length === 0 && displayAllOnNoResults) {
    results = allResultsForVertical;
  }

  const renderedResults = [...verticalResults.slice(0, currentOffset), ...verticalResults.slice(currentOffset, currentOffset + 10)];

  return (
    <AnalyticsScopeProvider name="results">
      <div className="ResultList">
        {renderedResults?.map(result => (
          <ResultListItem
            key={ result.id || result.index }
            CardComponent={ CardComponent }
            result={ result }
          />
        ))}
        <button 
          className={c({'hidden ': currentOffset >= 40 || (results.length < currentOffset + 10) }) + "Button Button--primary"}
          onClick={() => setCurrentOffset(currentOffset => currentOffset + 10)}
        >
          Show More
        </button>
      </div>
    </AnalyticsScopeProvider>
  )
}

interface ResultListItemProps {
  CardComponent: CardComponent,
  result: Result,
}

function ResultListItem(props: ResultListItemProps) {
  const { CardComponent, result } = props;
  const {
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    focusedId,
    setFocusedId,
  }  = useLocatorContext();
  const listItemRef = useRef<HTMLDivElement | null>(null);

  // When the selectedId is updated from a marker click scroll the ResultList to show the current LocatorCard
  useEffect(() => {
    if (selectedId === result.id) {
      listItemRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest"});
    }
  }, [selectedId]);
  const type = result.rawData.c_cambriaType;
  const id = result.rawData.id;
  const name = result.rawData.name;
  const category = result.rawData.c_customCategory;
  const c_salesRegionID = result.rawData.c_salesRegionID;
  const c_salesName = result.rawData.c_salesName;

  return (
    <div
      ref={ listItemRef }
      className={
        classNames(
          "ResultList-item",
          { "is-selected": selectedId === result.id },
          { "is-hovered": hoveredId === result.id || focusedId === result.id },
          { "yellowBorder": type == 'Premier Partner'},
          { "blackBorder": type == 'Cambria Showroom' || type == 'Cambria Gallery' || type == 'Cambria Surfaces' || type == 'NFM'},
          )
      }
      data-dealerlocations-id = {id}
      data-dealerlocations-accountName = {name}
      data-dealerlocations-category = {category}
      data-dealerlocations-salesregionid = {c_salesRegionID}
      data-dealerlocations-salesregionname = {c_salesName}
      onClick={ () => setSelectedId(result.id ?? "" ) }
      onFocus={ () => setFocusedId(result.id ?? "") }
      onBlur={ () => setFocusedId("") }
      onMouseEnter={ () => setHoveredId(result.id ?? "") }
      onMouseLeave={ () => setHoveredId("") }
    >
      <CardComponent result={ result } />
    </div>
  )

}
