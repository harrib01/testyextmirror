import React, { useState } from "react";
import { Link } from "@yext/pages/components";
import type { CTA, Image as ImageType } from "@yext/types";
import c from "classnames";
import { MaybeLink } from "src/components/common/MaybeLink";
import { useBreakpoint } from "src/common/useBreakpoints";
import americanMadeHeaderImage from "../../../static/assets/images/americanMadeHeader.png";
import headerLogoMobile from "../../../static/assets/images/cambriaMobileLogo.png";
import headerImageInverted from "../../../static/assets/images/americaInverted.png";
import cambriaLogoDesktop from "../../../static/assets/images/cambriaLogoDesktop.png";
import "src/components/common/Header.css";

const defaultFields: string[] = [
  "c_header",
  "c_headerTop",
  "c_headerBottomRight",
  "c_headerLogoLink",
];

type HeaderProps = {
  links: CTA[];
  linksTop: CTA[];
  linksBottomRight: CTA[];
  logo?: ImageType;
  logoLink?: string;
  linkToLocator: string;
};

const Header = (props: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logo, logoLink, links, linksTop, linksBottomRight } = props;
  const isDesktopBreakpoint = useBreakpoint("lg");
  const iconRight = (
    <svg
      width="14"
      height="25"
      viewBox="0 0 14 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.569496 0.483431L0.189079 0.863794C-0.0630263 1.1159 -0.0630263 1.52467 0.189079 1.77683L10.7065 12.2943L0.189079 22.8118C-0.0630263 23.0639 -0.0630263 23.4727 0.189079 23.7249L0.569496 24.1052C0.821601 24.3573 1.23037 24.3573 1.48248 24.1052L12.8369 12.7508C13.089 12.4987 13.089 12.0899 12.8369 11.8378L1.48248 0.483431C1.23037 0.231272 0.821601 0.231272 0.569496 0.483431Z"
        fill="#C59617"
      />
    </svg>
  );

  const toggleSVG = (
    <svg
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.25"
        y="16.25"
        width="24.5"
        height="3.5"
        stroke="white"
        strokeWidth="1"
      />
      <rect
        x="0.25"
        y="8.25"
        width="24.5"
        height="3.5"
        stroke="white"
        strokeWidth="1"
      />
      <rect
        x="0.25"
        y="0.25"
        width="24.5"
        height="4.16667"
        stroke="white"
        strokeWidth="1"
      />
    </svg>
  );

  return (
    <header className="Header relative">
      {isDesktopBreakpoint && (
        <div className="bg-black text-white py-[14px] px-[50px]">
          <div className="hidden md:flex items-center justify-end">
            <ul className="flex">
              {linksTop.map((item: CTA, idx) => (
                <li className="flex" key={item.label}>
                  <Link
                    className="uppercase tracking-[0.7px] font-medium text-[10px] hover:underline mx-[15px] mt-[2px]"
                    cta={item}
                    eventName={`toplink${idx}`}
                  />
                </li>
              ))}
            </ul>
            <ul className="uppercase tracking-[0.7px] font-medium flex text-[10px] hover:underline mx-[15px] mt-[2px]">
              <a ng-href="tel:18662262742" target="" href="tel:18662262742">
                1-866-CAMBRIA
              </a>
            </ul>
            <img
              src={americanMadeHeaderImage}
              width={115}
              className="flex"
              alt="family owned american"
            />
          </div>
        </div>
      )}
      <div className="flex justify-start items-center p-[16px] pl-[26px] lg:px-[34px] lg:pb-[41px] lg:pt-[25px] bg-black lg:bg-white h-[69px] lg:h-[91px]">
        <div className="hidden lg:flex items-center whitespace-nowrap flex-1">
          <ul className="flex flex-wrap">
            {links.map((item: CTA, idx) => (
              <li key={item.label}>
                <Link
                  className="Link Link--primary Link--header mx-2 lg:mx-[0.9375rem] tracking-[0.7px]"
                  cta={item}
                  eventName={`bottomlink${idx}`}
                />
              </li>
            ))}
          </ul>
        </div>
        {logo && (
          <div className="bg-black lg:p-[18px] lg:pt-[24px] lg:h-[110px]">
            <MaybeLink className="Header-logoLink" linkUrl={logoLink}>
              <div className="flex bg-black lg:ml-[3px]">
                {isDesktopBreakpoint ? (
                  <img
                    width={111}
                    src={cambriaLogoDesktop}
                    alt="Cambria quartz logo"
                  />
                ) : (
                  <img
                    width={170}
                    src={headerLogoMobile}
                    alt="Cambria quartz logo"
                  />
                )}
              </div>
            </MaybeLink>
          </div>
        )}
        <div className="hidden lg:flex items-center whitespace-nowrap flex-1 justify-end">
          <ul className="flex flex-wrap">
            {linksBottomRight.map((item: CTA) => (
              <li key={item.label}>
                {item.link == "https://www.google.com" ? (
                  <Link
                    className="Link Link--primary Link--header mx-2 lg:mx-[0.9375rem] tracking-[0.7px]"
                    href={props.linkToLocator}>
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    className="Link Link--primary Link--header mx-2 lg:mx-[0.9375rem] tracking-[0.7px]"
                    cta={item}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="flex lg:hidden absolute p-4 right-0 top-1/2 -translate-y-1/2"
          onClick={() => setMenuOpen(!menuOpen)}>
          {toggleSVG}
          <span className="sr-only">Toggle Header Menu</span>
        </button>
      </div>

      <div
        className={
          c({ "Header-container visible": menuOpen }) +
          "hidden absolute top-full left-0 right-0 bottom-0 h-fit bg-white"
        }>
        <div className="p-[12px] h-[100vh] overflow-x-auto">
          <div className="p-[10px] border-b border-black">
            <img
              width={126}
              src={headerImageInverted}
              className="flex"
              alt="family owned american"
            />
          </div>
          <ul className="flex flex-col">
            {links.map((item: CTA) => (
              <li key={item.label} className="flex border-b">
                <Link
                  className="Link--header py-[30.5px] uppercase flex justify-center w-[100%] z-100"
                  cta={item}
                />
                <span className="ml-[-20px] my-auto">{iconRight}</span>
              </li>
            ))}
            {linksBottomRight.map((item: CTA) => (
              <li key={item.label} className="flex border-b">
                {item.link == "https://www.google.com" ? (
                  <Link
                    className="Link--header py-[34.5px] uppercase flex justify-center w-[100%] z-100"
                    href={props.linkToLocator}>
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    className="Link--header py-[34.5px] uppercase flex justify-center w-[100%] z-100"
                    cta={item}
                  />
                )}
                <span className="ml-[-20px] my-auto">{iconRight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export { Header, defaultFields };
