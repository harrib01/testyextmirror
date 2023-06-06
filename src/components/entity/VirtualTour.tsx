import React from "react";
import type {
  Image as ImageType,
  CTA as CTAType,
  Coordinate
} from "@yext/types";
import { Link, Image } from "@yext/pages/components";
import { useRef } from "react";
import LocationMapWrapper from "src/components/common/LocationMapWrapper";
import { GoogleMaps } from "@yext/components-tsx-maps";
import "src/components/entity/About.css";
import Markdown from "src/components/entity/Markdown";
import { LocationProfile } from "src/types/entities";
import { getDirections } from "@yext/pages/components";

type VirtualTourProps = {
  url: string;
};

const VirtualTour = (props: VirtualTourProps) => {
  return (
    <div className="VirtualTour py-8 sm:py-16">
      <div className="container ">
        <iframe src={props.url} height="620" width="100%"></iframe>
      </div>
    </div>
  )
};

export {
  VirtualTour,
};
