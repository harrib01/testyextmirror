import React from "react";
import { LocationMap } from "@yext/sites-react-components";
import { Coordinate } from "@yext/pages/components";
import useIfVisible from "src/components/util/LazyLoad";

interface LocationMapWrapperProps {
  mapRef: React.RefObject<HTMLElement>;
  children: React.ReactChild;
  provider: any;
  clientKey: string;
  coordinate: Coordinate;
  href?: string;
};

const LocationMapWrapper = ({mapRef, ...props}: LocationMapWrapperProps) => {
  const isVisible = useIfVisible(mapRef);
  if (!isVisible) return <></>;
  const newProp = {...props, pinUrl: props.href};
  return (
    <LocationMap {...newProp} />
  );
};

export default LocationMapWrapper;
