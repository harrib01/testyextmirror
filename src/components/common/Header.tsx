import React, { useState } from "react";
import { Image, Link } from "@yext/pages/components";
import type { CTA, Image as ImageType } from "@yext/types";
import { FaBars, FaTimes } from "react-icons/fa";
import c from "classnames";
import { MaybeLink } from "src/components/common/MaybeLink";
import { useBreakpoint } from "src/common/useBreakpoints";
import headerImage from "src/assets/images/headerImage.png";
import headerImageInverted from "src/assets/images/AmericaInverted.png";
import headerLogoMobile from "src/assets/images/headerLogoMobile.png";
import logo2 from "src/assets/images/logo.png";
import 'src/components/common/Header.css';

const defaultFields: string[] = [
  'c_header',
  'c_headerTop',
  'c_headerBottomRight',
  'c_headerLogoLink',
];

type HeaderProps = {
  links: CTA[];
  linksTop: CTA[];
  linksBottomRight: CTA[]
  logo?: ImageType;
  logoLink?: string;
  linkToLocator: string;
}

const Header = (props: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logo, logoLink, links, linksTop, linksBottomRight } = props;
  const isDesktopBreakpoint = useBreakpoint("lg");
  const iconRight = (
    <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.569496 0.483431L0.189079 0.863794C-0.0630263 1.1159 -0.0630263 1.52467 0.189079 1.77683L10.7065 12.2943L0.189079 22.8118C-0.0630263 23.0639 -0.0630263 23.4727 0.189079 23.7249L0.569496 24.1052C0.821601 24.3573 1.23037 24.3573 1.48248 24.1052L12.8369 12.7508C13.089 12.4987 13.089 12.0899 12.8369 11.8378L1.48248 0.483431C1.23037 0.231272 0.821601 0.231272 0.569496 0.483431Z" fill="#C59617" />
    </svg>
  );

  const toggleSVG = (
    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.25" y="16.25" width="24.5" height="3.5" stroke="white" stroke-width="0.5" />
      <rect x="0.25" y="8.25" width="24.5" height="3.5" stroke="white" stroke-width="0.5" />
      <rect x="0.25" y="0.25" width="24.5" height="4.16667" stroke="white" stroke-width="0.5" />
    </svg>
  )

  return (
    <header className="Header relative">
      {isDesktopBreakpoint && (
        <div className="bg-black text-white py-[14px] px-[10px]">
          <div className="hidden md:flex items-center justify-end">
            <ul className="flex">
              {linksTop.map((item: CTA, idx) => (
                <li key={item.label}>
                  <Link className="uppercase tracking-[1.7px] font-medium text-[12px] hover:underline mx-[26px]" cta={item} eventName={`toplink${idx}`} />
                </li>
              ))}
            </ul>
            <ul className="uppercase tracking-[1.7px] font-medium flex text-[12px] hover:underline mx-[26px]">
              <a ng-href="tel:18662262742" target="" href="tel:18662262742">
                1-866-CAMBRIA
              </a>
            </ul>
            <img src={headerImage} className="flex" alt="family owned american" />
          </div>
        </div>
      )}
      <div className="flex justify-start bg-black lg:bg-white h-[50px] lg:h-auto">
        <div className="hidden lg:flex items-center whitespace-nowrap flex-1">
          <ul className="flex flex-wrap">
            {links.map((item: CTA, idx) => (
              <li key={item.label}>
                <Link className="Link Link--primary Link--header mx-2 lg:mx-4" cta={item} eventName={`bottomlink${idx}`} />
              </li>
            ))}
          </ul>
        </div>
        {logo && (
          <div className="bg-black my-auto lg:p-[10px] lg:pb-[30px]">
            <MaybeLink className="Header-logoLink" linkUrl={logoLink}>
              <div className="flex bg-black">
                {isDesktopBreakpoint ? (
                  <img className="w-[144px]" src={logo2} />
                ) : (
                  <img src={headerLogoMobile} />
                )}
              </div>
            </MaybeLink>
          </div>
        )}
        <div className="hidden lg:flex items-center whitespace-nowrap flex-1 justify-end">
          <ul className="flex flex-wrap">
            {linksBottomRight.map((item: CTA) => (
              <li key={item.label}>
                {item.link == 'https://www.google.com' ? (
                  <Link className="Link Link--primary Link--header mx-2 lg:mx-4" href={props.linkToLocator}>
                    {item.label}
                  </Link>
                ) : (
                  <Link className="Link Link--primary Link--header mx-2 lg:mx-4" cta={item} />
                )}
              </li>
            ))}
          </ul>
        </div>
        <button className="flex lg:hidden absolute p-4 right-0 top-1/2 -translate-y-1/2"
          onClick={() => setMenuOpen(!menuOpen)}>
          {toggleSVG}
          <span className="sr-only">Toggle Header Menu</span>
        </button>
      </div>

      <div className={c({ 'Header-container visible': menuOpen }) + 'hidden absolute top-full left-0 right-0 bottom-0 h-fit bg-white'}>
        <div className="p-[12px] h-[100vh] overflow-x-auto">
          <div className="p-[10px] border-b border-black">
            <img src={headerImageInverted} className="flex w-[30%]" alt="family owned american" />
          </div>
          <ul className="flex flex-col">
            {links.map((item: CTA) => (
              <li key={item.label} className="flex border-b">
                <Link className="Link--header py-[34.5px] uppercase block flex justify-center w-[100%] z-100" cta={item} />
                <span className="ml-[-20px] my-auto">
                  {iconRight}
                </span>
              </li>
            ))}
            {linksBottomRight.map((item: CTA) => (
              <li key={item.label} className="flex border-b">
                {item.link == 'https://www.google.com' ? (
                  <Link className="Link--header py-[34.5px] uppercase block flex justify-center w-[100%] z-100" href={props.linkToLocator}>
                    {item.label}
                  </Link>
                ) : (
                  <Link className="Link--header py-[34.5px] uppercase block flex justify-center w-[100%] z-100" cta={item} />
                )}
                <span className="ml-[-20px] my-auto">
                  {iconRight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export {
  Header,
  defaultFields,
};