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

const defaultFields: string[] = [
  'description',
];

type AboutProps = {
  title?: string;
  description?: string;
  coord: Coordinate;
  profile: LocationProfile;
};

const About = (props: AboutProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { profile } = props;

  const mappinSVG = (
    <svg width="48" height="51" viewBox="0 0 48 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.0815 1.10876C28.3842 1.10876 32.2795 2.85278 35.0992 5.67247C37.9189 8.49216 39.6629 12.3875 39.6629 16.6902C39.6629 22.4991 34.4317 33.3014 24.0807 49.1088C13.7306 33.3 8.5 22.4988 8.5 16.6902C8.5 12.3875 10.244 8.49216 13.0637 5.67247C15.8834 2.85278 19.7788 1.10876 24.0815 1.10876Z" fill="black" stroke="#4C4C4C"/>
      <path d="M24.0815 23.6153C27.9061 23.6153 31.0066 20.5149 31.0066 16.6902C31.0066 12.8656 27.9061 9.76514 24.0815 9.76514C20.2568 9.76514 17.1564 12.8656 17.1564 16.6902C17.1564 20.5149 20.2568 23.6153 24.0815 23.6153Z" fill="white"/>
    </svg>
  );

  const directionHref = getDirections(profile.address, profile.ref_listings, profile.googlePlaceId);

  return (
    <div className="About py-8 sm:py-16">
      <div className="container block gap-0 sm:flex sm:flex-col md:flex-row sm:gap-8 md:gap-16">
        {props.coord && (
          <div ref={mapRef} className="block w-full md:w-1/2 h-[164px] sm:h-[264px] md:h-[364px] mb-8 sm:mb-0">
            <LocationMapWrapper mapRef={mapRef} clientKey={'gme-yextinc'} coordinate={props.coord} provider={GoogleMaps} href={profile.c_googleListingURL ? profile.c_googleListingURL : directionHref}>
              {mappinSVG}
            </LocationMapWrapper>
          </div>
        )}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          {props.title && (
            <h2 className="Heading Heading--head tracking-[1.4px] uppercase">
              {props.title}
            </h2>
          )}

          {props.description && (
            <div className="font-secondary font-light">
              <Markdown>
                {props.description}
              </Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export {
  About,
  defaultFields,
};
