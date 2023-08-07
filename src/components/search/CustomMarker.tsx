import { useEffect } from "react";
import type { Coordinate } from "@yext/types";
import { Coordinate as CoordinateClass } from "@yext/components-tsx-geo";
import { Marker, useMapContext } from "@yext/pages/components";
import { useLocatorContext } from "src/components/search/Locator";
import type { Address as AddressType, Hours } from "@yext/types";
import { HoursStatus } from "@yext/sites-react-components";
import type { StatusParams } from "@yext/sites-react-components";
import { Address } from "@yext/pages/components";
import "./CustomMarker.css";
import { useBreakpoint } from "src/common/useBreakpoints";
import { Link } from "@yext/pages/components";
import c from "classnames";
import { isProduction } from "@yext/pages/util";
import { addToDatalayer } from "src/components/common/GTMhelper";
import { useState } from "react";

type CustomMarkerProps = {
  coordinate: Coordinate,
  id: string,
  index: number,
  type: string,
  address: AddressType,
  hours: Hours,
  name: string,
  slug: string,
  salesforce: string,
  regionId: string,
  regionName: string,
  category: string[],
}

export default function CustomMarker(props: CustomMarkerProps) {
  const {
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    focusedId,
    setFocusedId,
  } = useLocatorContext();

  const { coordinate, id, index, hours, address, name, slug, salesforce, type, regionId, regionName, category } = props;
  const selected = id === selectedId;
  const focused = id === focusedId;
  const hovered = id === hoveredId;
  const map = useMapContext();

  // If a marker is offscreen when its corresponding LocatorCard is clicked, pan the map to be centered on the marker
  useEffect(() => {
    if (selectedId === id) {
      if (!map.getBounds().contains(new CoordinateClass(coordinate))) {
        map.setCenter(coordinate, true);
      }
    }
  }, [selectedId]);

  let isClosed = false;
  if (hours?.monday?.isClosed && hours.tuesday?.isClosed && hours.wednesday?.isClosed && hours.thursday?.isClosed && hours.friday?.isClosed && hours.saturday?.isClosed && hours.sunday?.isClosed) {
    isClosed = true;
  }
  const isDesktopBreakpoint = useBreakpoint("sm");

  const closeIconSVG = (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.55427 1.44299L8.68565 0.520996L5.24198 4.17627L1.79831 0.520996L0.929688 1.44299L4.37336 5.09826L0.929688 8.75353L1.79831 9.67553L5.24198 6.02025L8.68565 9.67553L9.55427 8.75353L6.1106 5.09826L9.55427 1.44299Z" fill="#4C4C4C" />
    </svg>
  );

  return (
    <div className="relative">
      <Marker
        coordinate={coordinate}
        id={id}
        onClick={setSelectedId}
        onFocus={(focused, id) => setFocusedId(focused ? id : "")}
        onHover={(hovered, id) => setHoveredId(hovered ? id : "")}
        zIndex={selected ? 51 : hovered || focused ? 52 : (50-index)}
      >
        {getMapPin(type, index, selected, hovered, focused)}
      </Marker>
      {selected && !isDesktopBreakpoint && (
        <div className="CustomMarker-card bg-white absolute w-[322px]">
          <div className="p-[5px] flex justify-end">
            <button className="" onClick={() => setSelectedId('')}>
              {closeIconSVG}
            </button>
          </div>
          <div className="px-4 pb-[22px]">
            <h3 className="Heading Heading--sub pb-2 sm:pb-4 tracking-[1.7px] uppercase text-left">{props.name}</h3>
            {(props.hours && !isClosed) && (
              <div className="Heading Heading--hours pb-2 sm:pb-4 font-secondary text-brand-gray-300 -ml-2.5">
                <HoursStatus
                  currentTemplate={(params: StatusParams) => <span className="HoursStatus-current--search">{params.isOpen ? 'Open Now' : 'Closed'}</span>}
                  hours={hours}
                  separatorTemplate={() => <span className="bullet" />}
                />
              </div>
            )}
            <Address
              className="Heading Heading--hours pb-2 sm:pb-4 font-secondary text-left text-brand-gray-300"
              address={address}
              lines={[['line1'], ['line2'], ['city', 'region', "postalCode"]]}
            />
            <div className="flex flex-col gap-3 pb-3">
              {type != null && type != "Home Depot" && (
                <Link className={c({ 'hidden ': type == 'Premier Partner' }, { 'Button Button--secondaryInv ': type != 'Premier Partner' }) + "uppercase"} href={salesforce ? salesforce : 'https://www.cambriausa.com/cambria-consultation'}
                  onClick={() => (addToDatalayer(
                    {
                      'event': 'dealerlocator_nav_appointment_click',
                      'dealerlocator_nav_appointment_url': salesforce ? salesforce : 'https://www.cambriausa.com/cambria-consultation',
                      'dealerlocator_nav_appointment_name': 'Schedule a Consultation',
                      'dealerlocator_details_acct_name': name,
                      'dealerlocator_details_dealer_id': id,
                      'dealerlocator_details_region_id': regionId,
                      'dealerlocator_details_region_name': regionName,
                      'dealerlocator_details_category': category,
                    }))}
                >
                  schedule a consultation
                </Link>
              )}
              {slug && (
                <Link className={c({ 'Button Button--primary ': type == 'Premier Partner' }, { 'Button Button--secondary ': type != 'Premier Partner' }) + "uppercase"} href={slug}
                  onClick={() => (addToDatalayer(
                    {
                      'event': 'dealerlocator_nav_viewdetails_click',
                      'dealerlocator_nav_viewdetails_url': isProduction(window.location.hostname) ? 'https://www.cambriausa.com/dealer-locator' + slug : 'https://devtrunk-www-cambriausa-com-pagescdn-com.preview.pagescdn.com' + slug,
                      'dealerlocator_nav_viewdetails_name': 'View Details',
                      'dealerlocator_details_acct_name': name,
                      'dealerlocator_details_dealer_id': id,
                      'dealerlocator_details_region_id': regionId,
                      'dealerlocator_details_region_name': regionName,
                      'dealerlocator_details_category': category,
                    }))}
                >
                  {type == 'Premier Partner' ? 'Schedule or View Details' : 'view details'}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getMapPin(type: string, index: number, selected: boolean, hovered: boolean, focused: boolean) {
  const height = selected ? 64 : 48;
  const width = selected ? 41 : 31;
  switch (type) {
    case 'Premier Partner':
      return (
        <svg width={width} height={height} viewBox="0 0 33 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.0815 1.10864C20.3842 1.10864 24.2795 2.85266 27.0992 5.67235C29.9189 8.49204 31.6629 12.3874 31.6629 16.6901C31.6629 22.499 26.4317 33.3012 16.0807 49.1086C5.73056 33.2999 0.5 22.4987 0.5 16.6901C0.5 12.3874 2.24402 8.49204 5.06371 5.67235C7.8834 2.85266 11.7788 1.10864 16.0815 1.10864Z" fill={hovered || focused ? '#FFF' : '#C59617'} stroke="#4C4C4C" />
          <text x="50%" y="40%" fontSize="14px" fontWeight="bold" dominantBaseline="middle" textAnchor="middle" fill={hovered || focused ? '#C59617' : '#FFF'}>{index}</text>
        </svg>
      );
    case 'Cambria Showroom':
    case 'Cambria Gallery':
    case 'Cambria Surfaces':
    case 'NFM':
      return (
        <svg width={width} height={height} viewBox="0 0 33 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.0815 1.10864C20.3842 1.10864 24.2795 2.85266 27.0992 5.67235C29.9189 8.49204 31.6629 12.3874 31.6629 16.6901C31.6629 22.499 26.4317 33.3012 16.0807 49.1086C5.73056 33.2999 0.5 22.4987 0.5 16.6901C0.5 12.3874 2.24402 8.49204 5.06371 5.67235C7.8834 2.85266 11.7788 1.10864 16.0815 1.10864Z" fill={hovered || focused ? '#FFF' : '#000'} stroke="#4C4C4C" />
          <text x="50%" y="40%" fontSize="14px" fontWeight="bold" dominantBaseline="middle" textAnchor="middle" fill={hovered || focused ? '#000' : '#FFF'}>{index}</text>
        </svg>
      );
    default:
      return (
        <svg width={width} height={height} viewBox="0 0 33 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.0815 1.10864C20.3842 1.10864 24.2795 2.85266 27.0992 5.67235C29.9189 8.49204 31.6629 12.3874 31.6629 16.6901C31.6629 22.499 26.4317 33.3012 16.0807 49.1086C5.73056 33.2999 0.5 22.4987 0.5 16.6901C0.5 12.3874 2.24402 8.49204 5.06371 5.67235C7.8834 2.85266 11.7788 1.10864 16.0815 1.10864Z" fill={hovered || focused ? '#000' : '#FFF'} stroke="#4C4C4C" />
          <text x="50%" y="40%" fontSize="14px" fontWeight="bold" dominantBaseline="middle" textAnchor="middle" fill={hovered || focused ? '#FFF' : '#000'}>{index}</text>
        </svg>
      );
  }
}