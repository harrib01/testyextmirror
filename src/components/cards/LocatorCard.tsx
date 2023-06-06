import type { CardProps } from "@yext/search-ui-react";
import { HoursStatus } from "@yext/sites-react-components";
import type { StatusParams } from "@yext/sites-react-components";
import { Link } from "@yext/pages/components";
import type { Address as AddressType, Day, Hours } from "@yext/types";
import { useBreakpoint } from "src/common/useBreakpoints";
import c from "classnames";
import { Address } from "@yext/pages/components";
import { addToDatalayer } from "src/components/common/GTMhelper";
import { isProduction } from "@yext/pages/util";

export interface LocatorCardProps {
  useKilometers?: boolean;
}

export default function LocatorCard(props: LocatorCardProps & CardProps) {
  const { result, useKilometers = false } = props;
  const { distanceFromFilter, link, rawData: profile } = result;
  const address = profile.address as AddressType;
  const hours = profile.hours as Hours;
  const monday = hours?.monday as Day;
  const tuesday = hours?.tuesday as Day;
  const wednesday = hours?.wednesday as Day;
  const thursday = hours?.thursday as Day;
  const friday = hours?.friday as Day;
  const saturday = hours?.saturday as Day;
  const sunday = hours?.sunday as Day;
  const type = profile.c_cambriaType as string;
  const locationType = profile.c_locationType as string;
  const geomodifier = profile.name ? profile.name as string : address.line1 as string;
  const isDesktopBreakpoint = useBreakpoint("sm");
  const slug = profile.slug as string;
  const salesforceURL = profile.c_salesforceCommunitiesSchedulerURL as string;

  const renderTitle = () => <h3 className="Heading Heading--sub pb-2 sm:pb-4 tracking-[1.7px] uppercase">{geomodifier}</h3>;
  const renderDistance = () => distanceFromFilter ? <div className={"LocatorCard-distance whitespace-nowrap pt-2 sm:pt-0 font-secondary font-[14px] leading-[22px] font-light text-brand-gray-300"}>{getDistance(distanceFromFilter, useKilometers)} {useKilometers ? 'km' : 'mi'}</div> : null;

  let isClosed = false;
  if (monday?.isClosed && tuesday?.isClosed && wednesday?.isClosed && thursday?.isClosed && friday?.isClosed && saturday?.isClosed && sunday?.isClosed) {
    isClosed = true;
  }

  return (
    <div className="LocatorCard">
      <div className="flex justify-between">
        {slug &&  (
          <Link 
            href={slug} 
            className={c({'text-brand-primary ': type == 'Premier Partner'}) + "LocatorCard-visitpage Link--underlineInverse"}
            onClick={() => (addToDatalayer(
              {
                'event': 'dealer-profile_link_click',
                'dealer_locator_link_url': isProduction(window.location.hostname) ? 'https://cambriausa.com/dealer-locator' + slug : 'https://devtrunk-www-cambriausa-com-pagescdn-com.preview.pagescdn.com' + slug,
                'dealer_locator_link_name': geomodifier
              }))}
            >
            {renderTitle()}
          </Link>
        )}
        {renderDistance()}
      </div>
      {(hours && !isClosed) && (
        <div className="pb-2 sm:pb-4 font-secondary font-light text-brand-gray-300 font-[14px] leading-[22px]">
          <HoursStatus
            currentTemplate={(params: StatusParams) => <span className="HoursStatus-current--search">{params.isOpen ? 'Open Now' : 'Closed'}</span>}
            hours={hours}
            separatorTemplate={() => <span className="bullet" />}
          />
        </div>
      )}
      <Address 
        className="pb-2 sm:pb-4 font-secondary font-light font-[14px] leading-[22px] text-brand-gray-300" 
        address={address}
        lines={[['line1'],['line2'], ['city', 'region', "postalCode"]]}
      />
      <div className="flex flex-col gap-3 pb-3">
        {type != null && type != "Home Depot" && (
          <Link className={c({'hidden ': type == 'Premier Partner'}, {'Button Button--secondaryInv ': type != 'Premier Partner'}) + "uppercase"} href={salesforceURL ? salesforceURL : 'https://www.cambriausa.com/cambria-consultation'}
            onClick={() => (addToDatalayer(
              {
                'event': 'dealerlocator_nav_appointment_click',
                'dealerlocator_nav_appointment_url': salesforceURL ? salesforceURL : 'https://www.cambriausa.com/cambria-consultation',
                'dealerlocator_nav_appointment_name': 'Schedule a Consultation',
                'dealerlocator_details_acct_name': profile.name,
                'dealerlocator_details_dealer_id': profile.id,
                'dealerlocator_details_region_id': profile.c_salesRegionID,
                'dealerlocator_details_region_name': profile.c_salesName,
                'dealerlocator_details_category': profile.c_customCategory,
              }))}
          >
            schedule a consultation
          </Link>
        )}
        {slug && (
          <Link className={c({'Button Button--primary ': type == 'Premier Partner'}, {'Button Button--secondary ': type != 'Premier Partner'}) + "uppercase"} href={slug}
            onClick={() => (addToDatalayer(
              {
                'event': 'dealerlocator_nav_viewdetails_click',
                'dealerlocator_nav_viewdetails_url': isProduction(window.location.hostname) ? 'https://cambriausa.com/dealer-locator' + slug : 'https://devtrunk-www-cambriausa-com-pagescdn-com.preview.pagescdn.com' + slug,
                'dealerlocator_nav_viewdetails_name': 'View Details',
                'dealerlocator_details_acct_name': profile.name,
                'dealerlocator_details_dealer_id': profile.id,
                'dealerlocator_details_region_id': profile.c_salesRegionID,
                'dealerlocator_details_region_name': profile.c_salesName,
                'dealerlocator_details_category': profile.c_customCategory,
              }))}
            >
            {type == 'Premier Partner' ? 'Schedule or View Details' : 'view details'}
          </Link>
        )}
      </div>
    </div>
  )
}

// convert meters to miles or kilometers
function getDistance(distance: number, useKilometers: boolean) {
  if (useKilometers) {
    return (distance / 1000).toFixed(2);
  }
  return (distance / 1609.344).toFixed(2);
}
