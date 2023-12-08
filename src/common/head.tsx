import type { TemplateRenderProps, HeadConfig, Tag } from "@yext/pages";
import { SchemaBuilder } from "src/common/schema";
import { GoogleTagManagerHead } from "src/common/googleTagManager";
import { vwoScriptTags } from "./vwoScript";

const dnsPrefetchTags: Tag[] = [
  {
    type: "meta",
    attributes: { rel: "dns-prefetch", href: "//www.yext-pixel.com" },
  },
  {
    type: "meta",
    attributes: { rel: "dns-prefetch", href: "//a.cdnmktg.com" },
  },
  {
    type: "meta",
    attributes: { rel: "dns-prefetch", href: "//a.mktgcdn.com" },
  },
  {
    type: "meta",
    attributes: { rel: "dns-prefetch", href: "//dynl.mktgcdn.com" },
  },
  {
    type: "meta",
    attributes: { rel: "dns-prefetch", href: "//dynm.mktgcdn.com" },
  },
  {
    type: "meta",
    attributes: { rel: "dns-prefetch", href: "//www.google-analytics.com" },
  },
];

const defaultHeadTags: Tag[] = [
  {
    type: "meta",
    attributes: {
      "http-equiv": "X-UA-Compatible",
      content: "IE=edge",
    },
  },
  ...dnsPrefetchTags,
  {
    type: "meta",
    attributes: {
      name: "format-detection",
      content: "telephone=no",
    },
  },
  {
    type: "meta",
    attributes: {
      property: "og:type",
      content: "website",
    },
  },
  {
    type: "meta",
    attributes: {
      property: "twitter:card",
      content: "summary",
    },
  },
];

export function defaultHeadConfig(data: TemplateRenderProps, additionalTags?: Tag[]): HeadConfig {
  const logoTags: Tag[] = data.document?.logo
    ? [
        {
          type: "meta",
          attributes: {
            property: "og:image",
            content: data.document.logo.image.url,
          },
        },
      ]
    : [];

  const geoTags: Tag[] = data.document?.yextDisplayCoordinate
    ? [
        {
          type: "meta",
          attributes: {
            name: "geo.position",
            content: `${data.document.yextDisplayCoordinate.lat},${data.document.yextDisplayCoordinate.long}`,
          },
        },
      ]
    : [];
  const addressTags: Tag[] = data.document.address
    ? [
        {
          type: "meta",
          attributes: {
            name: "geo.placename",
            content: `${data.document.address.city},${data.document.address.region}`,
          },
        },
        {
          type: "meta",
          attributes: {
            name: "geo.region",
            content: `${data.document.address.countryCode}-${data.document.address.region}`,
          },
        },
      ]
    : [];

  return {
    title: metaTitle(data),
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: metaDescription(data),
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: metaTitle(data),
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: metaDescription(data),
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: canonicalUrl(data),
        },
      },
      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: canonicalUrl(data),
        },
      },
      ...logoTags,
      ...defaultHeadTags,
      ...geoTags,
      ...addressTags,
      ...alternates(data),
      ...(additionalTags || []),
    ],
    other:
      SchemaBuilder(data) +
      GoogleTagManagerHead(data.document._site?.c_googleTagManager) +
      vwoScriptTags() +
      "<link href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined' rel='stylesheet' />" +
      "<link rel='icon' href='https://publish-p108958-e1076754.adobeaemcloud.com/content/dam/cusa/logos-icons/logos/favicon/cambria-dragon-favicon.png' type='image/x-icon'>",
  };
}

function metaTitle(data: TemplateRenderProps): string {
  // 1. Check for meta field on the entity
  const { c_pageMetaTitle: entityMeta } = data.document;
  if (entityMeta) return entityMeta;

  return "";
}

function metaDescription(data: TemplateRenderProps): string {
  // 1. Check for meta field on the entity
  const { c_pageMetaDescription: entityMeta } = data.document;
  if (entityMeta) return entityMeta;

  // 2. Check for breadcrumbs
  const { dm_directoryParents } = data.document;
  if (dm_directoryParents) {
    return `${dm_directoryParents.map((crumb: { name: string }) => crumb.name).join(", ")}.`;
  }

  return "";
}

function canonicalUrl(data: TemplateRenderProps, locale?: string): string {
  let pagePath = data.path;

  const alfs = data.document?.alternateLanguageFields;
  if (alfs && locale) {
    const altLocalePath = alfs[locale]?.slug;
    if (altLocalePath) {
      pagePath = altLocalePath;
    }
  }

  if (pagePath == "index.html") {
    pagePath = "";
  }

  if (data.document.siteDomain.startsWith("www.")) {
    return `https://${data.document.siteDomain}/${pagePath}`;
  }

  return `https://www.${data.document.siteDomain}/${pagePath}`;
}

function alternates(data: TemplateRenderProps): Tag[] {
  const thisLocale = data.document.locale;
  const alternateLocales: string[] = Object.keys(data.document?.alternateLanguageFields || {});
  const alternateLinks: Tag[] = alternateLocales
    .filter((locale) => locale !== thisLocale)
    .map((locale) => ({
      type: "link",
      attributes: {
        rel: "alternate",
        hreflang: locale,
        href: canonicalUrl(data, locale),
      },
    }));
  return alternateLinks;
}
