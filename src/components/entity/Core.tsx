import React, { useEffect } from "react";
import { HoursTable } from "@yext/sites-react-components";
import { Link, Address, getDirections, Image } from "@yext/pages/components";
import type { LocationProfile } from "src/types/entities";
import { useBreakpoint } from "src/common/useBreakpoints";
import { useRef } from "react";
import "src/components/entity/Core.css";
import type { Day, Hours } from "@yext/types";
import c from "classnames";
import { addToDatalayer } from "src/components/common/GTMhelper";
import ConsultationForm from "src/components/marketo/ConsultationForm"

const defaultFields: string[] = [
  "address",
  "mainPhone",
  "googlePlaceId",
  "tollFreePhone",
  "emails",
  "hours",
  "additionalHoursText",
  "services",
  "geocodedCoordinate",
];

type CoreProps = {
  profile: LocationProfile;
  iframe?: string;
};

const CoreHeading = (props: { children: React.ReactNode }) => {
  return (
    <h2 className="Heading Heading--sub mb-4 font-medium uppercase font-primary tracking-[1.7px]">{props.children}</h2>
  );
};

const Core = (props: CoreProps) => {
  const isDesktopBreakpoint = useBreakpoint("sm");
  const { profile } = props;
  const mappinSVG = (
    <svg width="56" height="58" viewBox="0 0 56 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28.0951 1C33.1149 1 37.6595 3.03469 40.9491 6.32432C44.2388 9.61396 46.2734 14.1586 46.2734 19.1784C46.2734 25.9554 40.1704 38.558 28.0941 57C16.019 38.5565 9.91669 25.955 9.91669 19.1784C9.91669 14.1586 11.9514 9.61396 15.241 6.32432C18.5307 3.03469 23.0752 1 28.0951 1Z"
        fill="#0F70F0"
        stroke="black"
        strokeOpacity="0.5"
      />
      <path
        d="M28.095 27.2577C32.5571 27.2577 36.1743 23.6405 36.1743 19.1784C36.1743 14.7163 32.5571 11.0991 28.095 11.0991C23.633 11.0991 20.0157 14.7163 20.0157 19.1784C20.0157 23.6405 23.633 27.2577 28.095 27.2577Z"
        fill="white"
      />
    </svg>
  );
  const mapRef = useRef<HTMLDivElement>(null);
  const hours = profile.hours as Hours;
  const monday = hours?.monday as Day;
  const tuesday = hours?.tuesday as Day;
  const wednesday = hours?.wednesday as Day;
  const thursday = hours?.thursday as Day;
  const friday = hours?.friday as Day;
  const saturday = hours?.saturday as Day;
  const sunday = hours?.sunday as Day;

  let isClosed = false;
  if (
    hours &&
    monday?.isClosed &&
    tuesday?.isClosed &&
    wednesday?.isClosed &&
    thursday?.isClosed &&
    friday?.isClosed &&
    saturday?.isClosed &&
    sunday?.isClosed
  ) {
    isClosed = true;
  }

    useEffect(() => {
    addToDatalayer({
      event: "page load",
      CRMID: profile.c_cRMID,
      accountName: profile.name,
      dealerID: profile.id,
      salesRegionID: profile.c_salesRegionID,
      salesRegionName: profile.c_salesName,
      dealerCategory: profile.c_customCategory,
    });
  }, []);

  return (
    <div
      className="Core relative"
      data-dealerlocations-id={profile.c_cambriaType != "PREMIER_PARTNER" ? profile.id : null}
      data-dealerlocations-accountName={profile.c_cambriaType != "PREMIER_PARTNER" ? profile.name : null}
      data-dealerlocations-category={profile.c_cambriaType != "PREMIER_PARTNER" ? profile.c_customCategory : null}
      data-dealerlocations-salesregionid={profile.c_cambriaType != "PREMIER_PARTNER" ? profile.c_salesRegionID : null}
      data-dealerlocations-salesregionname={profile.c_cambriaType != "PREMIER_PARTNER" ? profile.c_salesName : null}
      crm-account-id={profile.c_cambriaType != "PREMIER_PARTNER" ? profile.c_cRMID : null}>
      {profile.c_heroImage && (
        <Image
          className={c(
            {
              "Core-image w-[100%] h-[780px] md:h-[700px] lg:h-auto lg:max-h-[650px]":
                !profile.c_cambriaType || profile.c_cambriaType != "PREMIER_PARTNER",
            },
            {
              "Core-image w-[100%] h-[1400px] sm:h-[1300px] lg:h-[900px] lg:max-h-[800px]":
                profile.c_cambriaType == "PREMIER_PARTNER",
            }
          )}
          image={profile.c_heroImage}
        />
      )}
      <div
        className={c(
          "left-0 right-0 absolute",
          {
            "top-1/2 -translate-y-1/2": profile.c_cambriaType && profile.c_cambriaType != "PREMIER_PARTNER",
          },
          {
            "top-1/2 -translate-y-1/2": !profile.c_cambriaType || profile.c_cambriaType == "PREMIER_PARTNER",
          }
        )}>
        <div className="container max-w-none xl:max-w-[1500px] lg:flex">
          <div className="Core-contentWrapper block p-4 lg:w-2/3 lg:mr-4">
            <h1 className="pb-3 sm:pb-6">
              <div className="Heading Heading--sub uppercase tracking-[1.7px] font-medium">{profile.name}</div>
              <div className="Heading Heading--lead uppercase tracking-[1.7px] font-thin">
                {profile.address.city}, {profile.address.region}
              </div>
            </h1>
            <div className="flex flex-row flex-wrap lg:flex-nowrap pt-3 sm:pt-6 sm:border-t sm:border-[#999]">
              <div className="w-full sm:w-1/2 lg:w-[30%] md:gap-3 mb-8">
                <CoreHeading>Location</CoreHeading>
                <div className="leading-[24px] font-secondary font-light mb-2">
                  {profile.address.line1}
                  <br />
                  {profile.address.line2 ? <div>{profile.address.line2}</div> : ""}
                  {profile.address.city}, {profile.address.region} {profile.address.postalCode}
                </div>
                <div className="flex flex-col">
                  <Link
                    className="Link--primary Link--underline font-medium mb-[20px]"
                    href={
                      profile.c_googleListingURL
                        ? profile.c_googleListingURL
                        : `${getDirections(profile.address, profile.ref_listings, profile.googlePlaceId)}`
                    }
                    eventName="direction"
                    onClick={() =>
                      addToDatalayer({
                        event: "dealerlocator_details_dealerdirections_click",
                        dealerlocator_details_dealerdirections_url: profile.c_partnerWebsite,
                        dealerlocator_details_dealerdirections_name: "View Details",
                        dealerlocator_details_acct_name: profile.name,
                        dealerlocator_details_dealer_id: profile.id,
                        dealerlocator_details_region_id: profile.c_salesRegionID,
                        dealerlocator_details_region_name: profile.c_salesName,
                        dealerlocator_details_category: profile.c_customCategory,
                      })
                    }>
                    Get Directions
                  </Link>
                  {profile.mainPhone && (
                    <Link
                      href={"tel:" + props.profile.mainPhone}
                      className="Link--primary Link--underline font-medium"
                      eventName="phone"
                      onClick={() =>
                        addToDatalayer({
                          event: "dealerlocator_details_appointment_phone",
                          dealerlocator_details_appointment_url: profile.c_partnerWebsite,
                          dealerlocator_details_appointment_name: "View Details",
                          dealerlocator_details_acct_name: profile.name,
                          dealerlocator_details_dealer_id: profile.id,
                          dealerlocator_details_region_id: profile.c_salesRegionID,
                          dealerlocator_details_region_name: profile.c_salesName,
                          dealerlocator_details_category: profile.c_customCategory,
                        })
                      }>
                      {profile.mainPhone}
                    </Link>
                  )}
                </div>
              </div>
              {(profile.hours || profile.additionalHoursText) && !isClosed && (
                <div className="w-full sm:w-1/2 lg:w-[40%] md:gap-3 mb-8">
                  <CoreHeading>Hours</CoreHeading>
                  {profile.hours && (
                    <div className="font-secondary">
                      <HoursTable hours={profile.hours} startOfWeek={"Today"} />
                    </div>
                  )}
                  {profile.additionalHoursText && (
                    <div className="font-secondary">
                      <div className="mt-4 font-bold">{profile.additionalHoursText}</div>
                    </div>
                  )}
                </div>
              )}
              {profile.c_cambriaType == "PREMIER_PARTNER" ? (
                <div className="w-full sm:w-1/2 lg:w-[40%] md:gap-3 mb-8 flex flex-col md:items-center">
                  {profile.c_partnerLogo && (
                    <Image className="h-auto w-[148px!important]" image={profile.c_partnerLogo} />
                  )}
                  {profile.c_partnerWebsite && (
                    <div className="mt-4">
                      <Link
                        className="Link Link--primary uppercase underline hover:no-underline"
                        href={profile.c_partnerWebsite}
                        target="_blank"
                        eventName="viewSite"
                        onClick={() =>
                          addToDatalayer({
                            event: "dealerlocator_details_viewwebsite_click",
                            dealerlocator_details_viewwebsite_url: profile.c_partnerWebsite,
                            dealerlocator_details_viewwebsite_name: "View Details",
                            dealerlocator_details_acct_name: profile.name,
                            dealerlocator_details_dealer_id: profile.id,
                            dealerlocator_details_region_id: profile.c_salesRegionID,
                            dealerlocator_details_region_name: profile.c_salesName,
                            dealerlocator_details_category: profile.c_customCategory,
                          })
                        }>
                        View Website
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {profile.c_cambriaType && profile.c_cambriaType != "HOME_DEPOT" && (
                    <div className="w-full sm:w-1/2 lg:w-[30%] md:gap-3 mb-8 whitespace-nowrap">
                      <CoreHeading>Schedule</CoreHeading>
                      <div className="flex flex-col">
                        <Link
                          onClick={() =>
                            addToDatalayer({
                              event: "dealer locator schedule appointment click",
                              accountName: profile.name,
                              dealerID: profile.id,
                              salesRegionID: profile.c_salesRegionID,
                              salesRegionName: profile.c_salesName,
                              dealerCategory: profile.c_customCategory,
                              CRMID: profile.c_cRMID,
                            })
                          }
                          className="Link Link--primary uppercase underline hover:no-underline mb-4"
                          href={
                            profile.c_salesforceCommunitiesSchedulerURL
                              ? profile.c_salesforceCommunitiesSchedulerURL
                              : "https://www.cambriausa.com/cambria-consultation"
                          }
                          eventName="showroomConsultation">
                          Showroom Consultation
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {!profile.c_cambriaType ||
            (profile.c_cambriaType == "PREMIER_PARTNER" && (
              <div className="pt-8 lg:pt-0 lg:w-[37%]">
                <div className="bg-white py-3">
                  <h2 className="uppercase text-center mb-[5px] text-[16px] tracking-[1.7px]">
                    schedule a consultation
                  </h2>
                  {profile.mainPhone && (
                    <div className="text-center font-secondary text-[14px]">
                      <span className="uppercase text-brand-gray-300 mr-1">or call</span>
                      <Link
                        href={"tel:" + props.profile.mainPhone}
                        className="Link--primary Link--underline"
                        eventName="phone"
                        onClick={() =>
                          addToDatalayer({
                            event: "dealerlocator_details_appointment_phone_alt",
                            dealerlocator_details_appointment_url: profile.c_partnerWebsite,
                            dealerlocator_details_appointment_name: "View Details",
                            dealerlocator_details_acct_name: profile.name,
                            dealerlocator_details_dealer_id: profile.id,
                            dealerlocator_details_region_id: profile.c_salesRegionID,
                            dealerlocator_details_region_name: profile.c_salesName,
                            dealerlocator_details_category: profile.c_customCategory,
                          })
                        }>
                        {profile.mainPhone}
                      </Link>
                    </div>
                  )}
                </div>
                <ConsultationForm
                    profile={profile} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export { Core, defaultFields };
