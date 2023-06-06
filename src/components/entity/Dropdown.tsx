import React from "react";
import type {
  Image as ImageType,
  CTA as CTAType,
  Coordinate,
  CTA
} from "@yext/types";
import "src/components/entity/About.css";
import { LocationProfile } from "src/types/entities";
import "src/components/entity/Expect.css";
import { useState } from "react";
import icon2 from "src/assets/images/icon2.png";
import c from "classnames";
import { addToDatalayer } from "src/components/common/GTMhelper";

type DropdownProps = {
  profile: LocationProfile;
  root: string;
};

const Dropdown = (props: DropdownProps) => {
  const { profile } = props;
  const [featureOpen, setFeatureOpen] = useState(false);
  const [designOpen, setDesignsOpen] = useState(false);

  const dropdownSVG = (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.874 1.32319L15.6194 1.06856C15.4508 0.899999 15.1783 0.899999 15.0097 1.06856L8.00202 8.07985L0.990726 1.06856C0.822168 0.899999 0.549606 0.899999 0.381048 1.06856L0.126418 1.32319C-0.0421395 1.49175 -0.0421395 1.76431 0.126418 1.93286L7.69359 9.50362C7.86215 9.67218 8.13471 9.67218 8.30327 9.50362L15.8704 1.93286C16.0426 1.76431 16.0426 1.49175 15.874 1.32319Z" fill="#999999" />
    </svg>
  );

  if (profile.c_designType && profile.c_designType.length > 1) {
    profile.c_designType.sort((a, b) => (a > b ? 1 : -1));
  }

  return (
    <div className="DropDown pt-8 sm:pt-16">
      <div className="container">
        <div className="font-secondary text-brand-gray-300 border-t border-[#999]">
          {profile.c_features && (
            <div className="border-b border-[#999] w-[100%]">
              <div className="uppercase tracking-[0.7px] w-[100%] py-4 text-left flex justify-between">
                Location features
              </div>
              <div className={c("text-[14px] visible pb-4 flex flex-wrap")}>
                {profile.c_features.map(curr =>
                  <div className="w-full sm:w-auto mb-3 sm:mb-1 sm:mr-8 capitalize flex">
                    <img className="w-[20px] mr-2 flex my-auto" src={`${props.root}favicon-e9b099f8.ico`} alt="" />
                    {curr.toLowerCase().replaceAll('_', ' ')}
                  </div>
                )}
              </div>
            </div>
          )}
          {profile.c_designType && (
            <div className="border-b border-[#999] w-[100%]">
              <div className="uppercase tracking-[0.7px] w-[100%] py-4 text-left flex justify-between">
                Designs on Display
              </div>
              <div className={c("text-[14px] visible pb-4 flex flex-wrap")}>
                {profile.c_designType.map(curr =>
                  <div className="w-full sm:w-auto mb-3 sm:mb-1 sm:mr-8 capitalize flex">
                    <img className="w-[20px] mr-2 flex my-auto" src={icon2} alt="" />
                    {curr}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export {
  Dropdown,
};
