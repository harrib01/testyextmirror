/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import React, { Profiler } from "react";
import type {
  Template,
  GetPath,
  TemplateConfig,
  TransformProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import "src/index.css";
import { defaultHeadConfig } from "src/common/head";
import type {
  TemplateRenderProps,
  LocationProfile,
  TemplateProps,
} from "src/types/entities";
import { dedupeStreamFields } from "src/common/helpers";
import { Main } from "src/layouts/main";

import { Core, defaultFields as coreFields } from "src/components/entity/Core";
import {
  Gallery,
  defaultFields as galleryFields,
} from "src/components/entity/Gallery";
import {
  About,
  defaultFields as aboutFields,
} from "src/components/entity/About";
import { VirtualTour } from "src/components/entity/VirtualTour";
import { Expect } from "src/components/entity/Expect";
import { Dropdown } from "src/components/entity/Dropdown";
import { formatPhone } from "src/common/helpers";
import { useBreakpoint } from "src/common/useBreakpoints";
import { CustomBreadcrumbs, Link } from "@yext/sites-react-components";
import { SEARCH_PATH } from "src/config";
import { AnalyticsScopeProvider } from "@yext/pages/components";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: dedupeStreamFields([
      "id",
      "uid",
      "logo",
      "meta",
      "name",
      "address",
      "mainPhone",
      "c_salesforceCommunitiesSchedulerURL",
      "geocodedCoordinate",
      "description",
      "hours",
      "c_features",
      "c_designType",
      "c_cRMID",
      "c_cambriaType",
      "c_locationType",
      "c_partnerLogo",
      "c_heroImage",
      "c_partnerWebsite",
      "c_imageCarousel",
      "c_pageMetaDescription",
      "c_pageMetaTitle",
      "c_whatToExpectSectionText",
      "c_whatToExpectSectionTitle",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryChildrenCount",
      "c_widenProfileDescription",
      "c_virtualTourURL",
      "c_googleListingURL",
      "c_salesRegionID",
      "c_salesName",
      "c_customCategory",
      "c_locationStatus",
      "c_webType",
      "slug",
      "c_aboutSectionTitle",
      "additionalHoursText",
    ]),
    // Defines the scope of entities that qualify for this stream.
    filter: {
      savedFilterIds: ["pages_locations", "1315709305"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
  alternateLanguageFields: ["name", "slug"],
};

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<TemplateRenderProps> = async (
  data: any
) => {
  const {
    mainPhone,
    fax,
    tollFreePhone,
    mobilePhone,
    ttyPhone,
    localPhone,
    alternatePhone,
    address,
  } = data.document;

  return {
    ...data,
    document: {
      ...data.document,
      mainPhone: formatPhone(mainPhone, address.countryCode),
      fax: formatPhone(fax, address.countryCode),
      tollFreePhone: formatPhone(tollFreePhone, address.countryCode),
      mobilePhone: formatPhone(mobilePhone, address.countryCode),
      ttyPhone: formatPhone(ttyPhone, address.countryCode),
      localPhone: formatPhone(localPhone, address.countryCode),
      alternatePhone: formatPhone(alternatePhone, address.countryCode),
    },
  };
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps<LocationProfile>> = (data) => {
  return data.document.slug;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps<LocationProfile>
> = (data): HeadConfig => {
  return defaultHeadConfig(data);
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Index: Template<TemplateRenderProps<LocationProfile>> = (data) => {
  const document = data.document as LocationProfile;
  const {
    id,
    geocodedCoordinate,
    name,
    address,
    description,
    hours,
    dm_directoryParents,
    _site,
    c_imageCarousel,
    c_aboutSectionTitle,

    // About Section
  } = document;

  const showAbout =
    name &&
    (description || document.c_widenProfileDescription) &&
    document.c_cambriaType != "HOME_DEPOT";
  let directoryName = "Galleries & Showrooms";
  let directoryLink = data.relativePrefixToRoot + _site.c_breadcrumbGalleries;
  if (document.c_cambriaType == "PREMIER_PARTNER") {
    directoryName = "Premier Partners";
    directoryLink = data.relativePrefixToRoot + _site.c_breadcrumbPremier;
  } else if (
    document.c_cambriaType == null ||
    document.c_cambriaType == "HOME_DEPOT"
  ) {
    directoryName = "Authorized Sellers";
    directoryLink = data.relativePrefixToRoot + _site.c_breadcrumbAuthorized;
  }
  const parents = [
    { name: "Find Cambria", slug: data.relativePrefixToRoot + SEARCH_PATH },
    { name: directoryName, slug: directoryLink },
    { name: name ? name : address.line1, slug: "" },
  ];
  let breadcrumbs = parents.map((parent) => {
    return [parent.name, parent.slug] as unknown as [string, string];
  });
  const isDesktopBreakpoint = useBreakpoint("sm");

  return (
    <Main data={data}>
      {isDesktopBreakpoint && (
        <CustomBreadcrumbs
          className="container text-brand-black py-4 font-primary lg:mt-[8rem] md:mt-[4rem] mt-[4rem]"
          breadcrumbs={breadcrumbs}
        />
      )}
      <AnalyticsScopeProvider name="core">
        <Core profile={document} iframe={_site.c_iframeURL} />
      </AnalyticsScopeProvider>
      {(document.c_features || document.c_designType) && (
        <AnalyticsScopeProvider name="dropdown">
          <Dropdown profile={document} root={data.relativePrefixToRoot} />
        </AnalyticsScopeProvider>
      )}
      <AnalyticsScopeProvider name="about">
        {showAbout && (
          <About
            title={c_aboutSectionTitle}
            coord={geocodedCoordinate}
            description={
              description ? description : document.c_widenProfileDescription
            }
            profile={document}
          />
        )}
      </AnalyticsScopeProvider>
      <AnalyticsScopeProvider name="expect">
        <Expect
          profile={document}
          promoParagraph={document.c_whatToExpectSectionText}
          promoTitle={document.c_whatToExpectSectionTitle}
          type={document.c_cambriaType}
        />
      </AnalyticsScopeProvider>
      {document.c_virtualTourURL && (
        <VirtualTour url={document.c_virtualTourURL} />
      )}
      {c_imageCarousel && document.c_cambriaType != "HOME_DEPOT" && (
        <Gallery images={c_imageCarousel} />
      )}
      {!isDesktopBreakpoint && (
        <CustomBreadcrumbs
          className="container text-brand-black py-4 font-primary"
          breadcrumbs={breadcrumbs}
        />
      )}
    </Main>
  );
};

export default Index;
