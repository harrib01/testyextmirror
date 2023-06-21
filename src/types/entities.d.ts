import { TemplateProps as InternalTemplateProps, TemplateRenderProps as InternalTemplateRenderProps } from "@yext/pages/*"
import type { ListingType } from "@yext/pages/components"
import type { Address, Coordinate, CTA, Hours, Image, ComplexImage, WebsiteUrl } from "@yext/types"

// Also we should probably move @yext/types into @yext/pages
// since they're specific to pages streams, not generic kg types
interface BaseProfile {
  readonly id: string
  readonly businessId: number
  readonly locale: string
  readonly siteDomain: string
  readonly siteId: number
  readonly siteInternalHostname: string
  readonly uid: number
  readonly meta: {
    readonly entityType: {
      readonly id: string
      readonly uid: number
    }
    readonly locale: string
  }
  readonly _site: SiteProfile
}

export interface SiteProfile extends BaseProfile {
  readonly name: string
  readonly c_copyrightMessage?: string
  readonly c_facebook?: string
  readonly c_houzz?: string
  readonly c_instagram?: string
  readonly c_pinterest?: string
  readonly c_twitter?: string
  readonly c_linkedIn?: string
  readonly c_footerLinks?: CTA[]
  readonly c_header?: {
    readonly logo?: Image
    readonly logoLink?: string
    readonly links?: CTA[]
  },
  readonly c_appleStore?: string
  readonly c_googlePlay?: string
  readonly c_headerTop?: {
    readonly logoLink?: string
    readonly links?: CTA[]
  },
  readonly c_emailSignUp?: CTA
  readonly c_getCambriaApp?: CTA
  readonly c_footerBottom?: CTA[]
  readonly c_headerBottomRight?: {
    readonly logoLink?: string
    readonly links?: CTA[]
  }
  readonly c_headerLogoLink?: string
  readonly c_nearbySectionAPIKey?: string;
  readonly c_searchExperienceAPIKey?: string;
  readonly c_promoParagraph?: string;
  readonly c_promoList?: string[];
  readonly c_googleTagManager?: string;
  readonly c_breadcrumbAuthorized?: string;
  readonly c_breadcrumbGalleries?: string;
  readonly c_breadcrumbPremier?: string;
  readonly c_iframeURL?: string;
  readonly c_findCambria?: string;
}

export interface ProductProfile extends BaseProfile {
  readonly name: string
  readonly primaryPhoto: ComplexImage
  readonly richTextDescription: string
  readonly c_primaryCTA: CTA
}

export interface SearchPageProfile extends BaseProfile {
  c_searchTitle: string
  c_searchDescription: string
  c_searchSubTitle: string
  c_searchPlaceholderText: string
}

export interface EventDate {
  readonly end: string
  readonly start: string
}

export interface EventProfile extends BaseProfile {
  readonly name: string
  readonly time: EventDate
  readonly description?: string
  readonly c_primaryCTA?: CTA
  readonly photoGallery?: ComplexImage[]
}

export interface FinancialProfessionalProfile extends BaseProfile {
  readonly id: string;
  readonly name: string;
  readonly headshot?: Image;
  readonly mainPhone?: string;
  readonly c_occupation?: string;
  readonly emails?: string[];
  readonly websiteUrl?: WebsiteUrl;
}

interface Insight {
  readonly title: string,
  readonly category?: string,
  readonly image?: Image,
  readonly date?: string,
  readonly descriptionLong: string,
  readonly descriptionShort?: string,
  readonly cta: CTA,
}

export interface LocationProfile extends BaseProfile {
  readonly name: string
  readonly address: Address
  readonly geocodedCoordinate: Coordinate
  readonly slug: string
  readonly hours?: Hours
  readonly additionalHoursText?: string
  readonly mainPhone?: string
  readonly fax?: string
  readonly tollFreePhone?: string
  readonly mobilePhone?: string
  readonly ttyPhone?: string
  readonly localPhone?: string
  readonly alternatePhone?: string
  readonly description?: string
  readonly emails?: string[]
  readonly services: string[]
  readonly photoGallery: ComplexImage[]
  readonly googlePlaceId?: string
  readonly ref_listings?: ListingType[]
  readonly logo?: Image
  readonly dm_directoryParents?: DirectoryProfile<DirectoryProfile<never>>[]
  readonly c_salesforceCommunitiesSchedulerURL?: string
  readonly c_features?: string[]
  readonly c_designType?: string[]
  readonly c_cambriaType?: string
  readonly c_locationType?: string
  readonly c_webType?: string[]
  readonly c_locationStatus?: string[]
  readonly c_partnerLogo?: Image
  readonly c_heroImage?: Image
  readonly c_partnerWebsite?: string
  readonly c_whatToExpectSectionText?: string
  readonly c_whatToExpectSectionTitle?: string
  readonly c_imageCarousel?: Image[]
  readonly c_widenProfileDescription?: string
  readonly c_virtualTourURL?: string
  readonly c_googleListingURL?: string
  readonly c_salesRegionID?: string
  readonly c_salesName?: string
  readonly c_customCategory?: string[]
  readonly c_cRMID?: string
  readonly c_aboutSectionTitle?: string
  readonly c_countryCode?: string

  // Add custom fields here
  // c_myStringField: string
  readonly c_eventsSection?: {
    readonly title?: string
    readonly events?: EventProfile[]
  }
  readonly c_bannerSection?: {
    readonly text?: string
    readonly image?: Image
  }
  readonly c_featuredProductsSection?: {
    readonly title?: string
    readonly products?: ProductProfile[]
  }
  readonly c_promoSection?: {
    readonly title?: string
    readonly description?: string
    readonly image?: Image
    readonly cta?: CTA
    readonly googlePlayUrl?: string
    readonly appStoreUrl?: string
  }
  readonly c_gallerySection?: {
    readonly title?: string
    readonly images?: Image[]
  }
  readonly c_teamSection?: {
    readonly title?: string
    readonly team?: FinancialProfessionalProfile[]
  }
  readonly c_faqSection?: {
    readonly title?: string
    readonly faqs?: FAQProfile[]
  },
  readonly c_nearbySection?: {
    readonly title?: string
    readonly linkToLocator?: boolean
    readonly cta?: CTA
  }
  readonly c_insightsSection?: {
    readonly title?: string
    readonly cta?: CTA
    readonly insights?: Insight[]
  }
}

export type DirectoryProfile<T> = BaseProfile & {
  readonly name: string
  readonly c_brand: string
  readonly dm_directoryChildrenCount: number
  readonly dm_directoryChildren?: T[]
  readonly dm_directoryParents?: DirectoryProfile<DirectoryProfile<T>>[]
  readonly slug: string
}

export interface FAQProfile extends BaseProfile {
  readonly question: string;
  readonly answer: string;
}

export type TemplateProps<T = Record<string, unknown>> = Omit<InternalTemplateProps, 'document'> & {
  document: T;
}
export type TemplateRenderProps<T = Record<string, unknown>> = Omit<InternalTemplateRenderProps, 'document'> & TemplateProps<T>;
