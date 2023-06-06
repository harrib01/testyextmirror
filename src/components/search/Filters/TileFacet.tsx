// src/components/TileFacet.tsx

import {
  // Matcher and NumberRangeValue will be used in step 3
  Matcher,
  NumberRangeValue,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import classNames from "classnames";

interface TileFacetProps {
  fieldId: string;
  displayName?: string;
  resultLength: number;
}

const TileFacet = ({ fieldId, displayName, resultLength }: TileFacetProps) => {
  const searchActions = useSearchActions();
  // searchActions.setVerticalLimit(30);
  const facet = useSearchState((state) =>
    state.filters.facets?.find((f) => f.fieldId === fieldId)
  );

  const handleFacetClick = (
    value: string | number | boolean | NumberRangeValue,
    selected: boolean,
    matcher = Matcher.Equals
  ) => {
    searchActions.setFacetOption(fieldId, { matcher, value }, selected);
    searchActions.executeVerticalQuery();
  };

  let newOptions;
  if (facet?.fieldId == "c_designType") {
    if (facet && facet.options.length > 1) {
      newOptions = [...facet.options];
      newOptions.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));
    }
  }

  let cambriaOrder = ['Cambria Gallery / Showroom', 'Cambria Surfaces', 'NFM', 'Premier Partner', 'Home Depot'];
  if (facet && facet?.fieldId == "c_locationType") {
    newOptions = [...facet.options];
    newOptions.sort((a, b) => (cambriaOrder.indexOf(a.displayName) > cambriaOrder.indexOf(b.displayName) ? 1 : -1));
  }

  // component returns null if the facet isn't found in the search state or has no options for a partiaular set of results
  return facet && facet.options.length > 0 ? (
    <div className="mb-4">
      <span className="Heading Heading--sub text-brand-primary uppercase tracking-[1.7px] leading-[20px]">{displayName ?? facet.displayName}</span>
      {facet?.fieldId == "c_designType" && newOptions && (
        <div key={facet.fieldId} className="w-72 mt-4 block">
          {newOptions.map((o, i) => (
            <div
              key={`${fieldId}_${i}`}
              className={classNames(
                "mr-3 mb-3",
              )}
              // handleFacetClick will trigger on click to reverse the selected state of the facet option
              onClick={() => handleFacetClick(o.value, !o.selected)}
            >
              <div className="font-secondary text-[14px] leading[22px] font-light inline-block">
                <input className="mr-2 accent-brand-primary" type="checkbox" checked={o.selected} />
                {/* Each facet option contains a display name and count */}
                <span className="mr-0.5">{o.displayName}</span>
                {o.count > resultLength ? (
                  <span className="text-xs">{`(${resultLength})`}</span>
                ) : (
                  <span className="text-xs">{`(${o.count})`}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {facet?.fieldId == "c_locationType" && newOptions && (
        <div key={facet.fieldId} className="w-72 mt-4 block">
          {newOptions.map((o, i) => (
            <div
              key={`${fieldId}_${i}`}
              className={classNames(
                "mr-3 mb-3",
              )}
              // handleFacetClick will trigger on click to reverse the selected state of the facet option
              onClick={() => handleFacetClick(o.value, !o.selected)}
            >

              <div className="font-secondary text-[14px] leading[22px] font-light inline-block">
                <input className="mr-2 accent-brand-primary" type="checkbox" checked={o.selected} />
                {/* Each facet option contains a display name and count */}
                <span className="mr-0.5">{o.displayName}</span>
                {o.count > resultLength ? (
                  <span className="text-xs">{`(${resultLength})`}</span>
                ) : (
                  <span className="text-xs">{`(${o.count})`}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
       {facet?.fieldId == "c_features" && (
        <div key={facet.fieldId} className="w-72 mt-4">
          {facet.options.map((o, i) => (
            <div
              key={`${fieldId}_${i}`}
              className={classNames(
                "mr-3 mb-3",
                {"hidden" : o.displayName != "Finance By Cambria"}
              )}
              // handleFacetClick will trigger on click to reverse the selected state of the facet option
              onClick={() => handleFacetClick(o.value, !o.selected)}
            >
              <div className="font-secondary text-[14px] leading[22px] font-light inline-block">
                <input className="mr-2 accent-brand-primary" type="checkbox" checked={o.selected} />
                {/* Each facet option contains a display name and count */}
                <span className="mr-0.5">{o.displayName}</span>
                {o.count > resultLength ? (
                  <span className="text-xs">{`(${resultLength})`}</span>
                ) : (
                  <span className="text-xs">{`(${o.count})`}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {( facet?.fieldId == "c_cambriaType" || facet?.fieldId == "c_webType" || facet?.fieldId == "c_locationStatus" ) && (
        <div key={facet.fieldId} className="w-72 mt-4">
          {facet.options.map((o, i) => (
            <div
              key={`${fieldId}_${i}`}
              className={classNames(
                "mr-3 mb-3",
              )}
              // handleFacetClick will trigger on click to reverse the selected state of the facet option
              onClick={() => handleFacetClick(o.value, !o.selected)}
            >
              <div className="font-secondary text-[14px] leading[22px] font-light inline-block">
                <input className="mr-2 accent-brand-primary" type="checkbox" checked={o.selected} />
                {/* Each facet option contains a display name and count */}
                <span className="mr-0.5">{o.displayName}</span>
                {o.count > resultLength ? (
                  <span className="text-xs">{`(${resultLength})`}</span>
                ) : (
                  <span className="text-xs">{`(${o.count})`}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : null;
};

export default TileFacet;