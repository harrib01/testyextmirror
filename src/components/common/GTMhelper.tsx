declare global {
  interface Window {
    dataLayer?: any;
  }
}

export function addToDatalayer(data: {
  event: string;
  dealer_locator_link_url?: string;
  dealer_locator_link_name?: string;
  dealerlocator_nav_appointment_url?: string;
  dealerlocator_nav_appointment_name?: string;
  dealerlocator_details_acct_name?: unknown;
  dealerlocator_details_dealer_id?: unknown;
  dealerlocator_details_region_id?: unknown;
  dealerlocator_details_region_name?: unknown;
  dealerlocator_details_category?: unknown;
  dealerlocator_nav_viewdetails_url?: string;
  dealerlocator_nav_viewdetails_name?: string;
  dealerlocator_details_dealerdirections_url?: string | undefined;
  dealerlocator_details_dealerdirections_name?: string;
  dealerlocator_details_appointment_url?: string | undefined;
  dealerlocator_details_appointment_name?: string;
  dealerlocator_details_viewwebsite_url?: string | undefined;
  dealerlocator_details_viewwebsite_name?: string;
  "dealer-locator_search_name"?: string;
  "dealer-locator_search_query"?: string;
  "dealer-locator_search_path"?: string;
  accountName?: string;
  dealerID?: string;
  salesRegionID?: string;
  salesRegionName?: string;
  dealerCategory?: string[];
  CRMID?: string;
}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}
