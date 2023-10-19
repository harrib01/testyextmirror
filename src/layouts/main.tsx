import React from "react";
import { ConfigurationProvider } from "@yext/sites-react-components";
import { TemplateDataProvider } from "src/common/useTemplateData";
import config from "../config";
import { Header } from "src/components/common/Header";
import type { TemplateRenderProps, BaseProfile } from "src/types/entities";
import Footer from "src/components/common/footer/Footer";
import { AnalyticsProvider, AnalyticsScopeProvider } from "@yext/pages/components";
import { GoogleTagManagerBody } from "src/common/googleTagManager";
import { SEARCH_PATH } from "src/config";
import useAdobeLaunchScript from "src/common/useAdobeLaunchScript";

interface MainProps {
  data: TemplateRenderProps<BaseProfile>;
  children?: React.ReactNode;
}

const Main = (props: MainProps) => {
  const { _site } = props.data.document;

  const { children } = props;
  const linkToLocator = props.data.relativePrefixToRoot + SEARCH_PATH;

  useAdobeLaunchScript();

  return (
    <ConfigurationProvider value={config}>
      {GoogleTagManagerBody(_site.c_googleTagManager)}
      <AnalyticsProvider templateData={props.data}>
        <TemplateDataProvider value={props.data}>
          <AnalyticsScopeProvider name="header">
            <Header
              logo={_site?.c_header?.logo}
              logoLink={_site?.c_headerLogoLink}
              links={_site?.c_header?.links || []}
              linksTop={_site?.c_headerTop?.links || []}
              linksBottomRight={_site?.c_headerBottomRight?.links || []}
              linkToLocator={linkToLocator}
            />
          </AnalyticsScopeProvider>
          {children}
          <AnalyticsScopeProvider name="footer">
            <Footer />
          </AnalyticsScopeProvider>
        </TemplateDataProvider>
      </AnalyticsProvider>
    </ConfigurationProvider>
  );
};

export { Main };
