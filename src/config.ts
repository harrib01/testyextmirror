import type { ConfigurationProviderContextType } from '@yext/sites-react-components';

const config: ConfigurationProviderContextType = {
  components: {},
};

export default config;

// Path for the search page.
// Exported here since it's required across multiple pages such as the nearby section and directory search bar.
export const SEARCH_PATH = "locations";
// Static filter field for FilterSearch.
export const LOCATOR_STATIC_FILTER_FIELD = "builtin.location";
// Entity type for FilterSearch
export const LOCATOR_ENTITY_TYPE = "location";
// Radius used for the locator geolocate button.
export const GEOLOCATE_RADIUS = 50;

// Search configuration used to initialize provider in search.tsx
export const getSearchProviderConfig = (apiKey: string, locale: string) => ({
	apiKey: "34390a3ebdeeac6c94677b646b1b2fc2",
	experienceKey: "locator-search",
	verticalKey: "locations",
	locale,
});

export const getSearchProviderConfigPro = (apiKey: string, locale: string) => ({
	apiKey: "34390a3ebdeeac6c94677b646b1b2fc2",
	experienceKey: "pro-locator-search",
	verticalKey: "locations",
	locale,
});