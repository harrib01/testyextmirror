import React from "react";
import { Link } from "@yext/pages/components";
import type { CTA } from "@yext/types";
import { useBreakpoint } from "src/common/useBreakpoints";
import logo from "src/assets/images/footerLogo.png";
import image from "src/assets/images/footerImage.png";
import appStoreIcon from "src/assets/images/AppStoreButton.png";
import playStoreIcon from "src/assets/images/GooglePlayButton.png";
import pinterest from "src/assets/images/pinterest.png";
import { MaybeLink } from "src/components/common/MaybeLink";

interface FooterProps {
  copyrightMessage: string;
  pinterest?: string;
  houzz?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  footerLinks: CTA[];
  linksBottom: CTA[];
  linksTop: CTA[];
  cta1?: CTA;
  cta2?: CTA;
  googlePlay?: string;
  appleStore?: string;
  logoLink?: string;
  linkToLocator: string;
}

const Footer = (props: FooterProps) => {
  const twitterSVG = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="#999999" />
      <path
        d="M21.0688 11.1649L20.844 11.3276L20.8632 11.6044C20.8715 11.7254 20.8717 11.8492 20.8717 11.9944C20.8717 16.0572 17.8264 20.6977 12.2783 20.8314L12.031 20.8318C10.9958 20.8333 9.97386 20.652 9.01047 20.3013C10.1564 20.1004 11.242 19.6194 12.167 18.8929L13.2704 18.0264L11.8677 17.9998C10.9448 17.9823 10.11 17.5122 9.61116 16.774C9.87886 16.7597 10.1451 16.717 10.4052 16.6459L10.3725 15.6735C9.32377 15.4616 8.51285 14.6767 8.23979 13.6847C8.52434 13.7621 8.81811 13.8061 9.11516 13.815L10.8555 13.8669L9.40791 12.8995C8.393 12.2212 7.96071 10.9853 8.26516 9.85742C9.9912 11.6543 12.3454 12.7356 14.8545 12.861L15.5163 12.8941L15.3665 12.2486C15.1421 11.2819 15.4486 10.269 16.1715 9.58971L16.1715 9.58967C17.2926 8.53586 19.0556 8.59001 20.1092 9.71026L20.2987 9.91178L20.5701 9.85827C20.7906 9.81481 21.0084 9.76093 21.223 9.69692C21.1092 9.79281 20.9873 9.87998 20.8581 9.95728L21.1735 10.8828C21.2761 10.8707 21.3784 10.8564 21.4802 10.8398C21.3479 10.9538 21.2107 11.0622 21.0688 11.1649Z"
        stroke="black"
      />
    </svg>
  );

  const facebookSVG = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="#999999" />
      <path
        d="M18.2792 7.59463C18.3811 7.60618 18.4749 7.61773 18.5586 7.62859V9.16094H17.7725C17.0333 9.16094 16.4656 9.39022 16.091 9.81563C15.727 10.229 15.6103 10.7545 15.6103 11.2253V13.1044V13.6044H16.1103H18.355L18.0588 15.5H16.1103H15.6103V16V22.5H13.4231V16V15.5H12.9231H10.8334V13.6044H12.9231H13.4231V13.1044V10.8975C13.4231 9.74456 13.7704 8.91024 14.3262 8.36382C14.8837 7.81579 15.7092 7.5 16.7756 7.5C17.3074 7.5 17.8576 7.54682 18.2792 7.59463Z"
        stroke="black"
      />
    </svg>
  );

  const instaSVG = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="#999999" />
      <path
        d="M15.1578 23C15.1048 23 15.0518 23 14.9985 22.9998C13.7443 23.0028 12.5854 22.9709 11.4584 22.9023C10.4252 22.8395 9.48203 22.4824 8.73078 21.8699C8.0059 21.2788 7.51088 20.4796 7.25953 19.4947C7.04077 18.6373 7.02918 17.7956 7.01807 16.9816C7.01001 16.3974 7.00171 15.7053 7 15.0014C7.00171 14.2947 7.01001 13.6025 7.01807 13.0184C7.02918 12.2044 7.04077 11.3628 7.25953 10.5052C7.51088 9.52035 8.0059 8.72115 8.73078 8.13009C9.48203 7.51753 10.4252 7.16048 11.4585 7.09761C12.5855 7.02913 13.7446 6.99715 15.0015 7.0002C16.2561 6.99751 17.4146 7.02913 18.5416 7.09761C19.5748 7.16048 20.518 7.51753 21.2692 8.13009C21.9942 8.72115 22.4891 9.52035 22.7405 10.5052C22.9592 11.3626 22.9708 12.2044 22.9819 13.0184C22.99 13.6025 22.9984 14.2947 23 14.9985V15.0014C22.9984 15.7053 22.99 16.3974 22.9819 16.9816C22.9708 17.7955 22.9593 18.6372 22.7405 19.4947C22.4891 20.4796 21.9942 21.2788 21.2692 21.8699C20.518 22.4824 19.5748 22.8395 18.5416 22.9023C17.4623 22.968 16.3536 23 15.1578 23ZM14.9985 21.7498C16.2323 21.7527 17.3651 21.7216 18.4656 21.6547C19.2469 21.6072 19.9243 21.3536 20.4793 20.9011C20.9922 20.4828 21.3455 19.9056 21.5292 19.1857C21.7114 18.4719 21.7219 17.7056 21.732 16.9645C21.7399 16.3843 21.7482 15.697 21.75 15C21.7482 14.3028 21.7399 13.6157 21.732 13.0355C21.7219 12.2944 21.7114 11.528 21.5292 10.8142C21.3455 10.0942 20.9922 9.51705 20.4793 9.09872C19.9243 8.64632 19.2469 8.39278 18.4656 8.3453C17.3651 8.27828 16.2323 8.2474 15.0014 8.25008C13.7678 8.24715 12.6349 8.27828 11.5344 8.3453C10.7531 8.39278 10.0757 8.64632 9.52073 9.09872C9.00777 9.51705 8.65448 10.0942 8.47076 10.8142C8.28862 11.528 8.27812 12.2943 8.26799 13.0355C8.26006 13.6162 8.25176 14.3038 8.25005 15.0014C8.25176 15.696 8.26006 16.3838 8.26799 16.9645C8.27812 17.7056 8.28862 18.4719 8.47076 19.1857C8.65448 19.9056 9.00777 20.4828 9.52073 20.9011C10.0757 21.3535 10.7531 21.6071 11.5344 21.6545C12.6349 21.7216 13.7681 21.7528 14.9985 21.7498ZM14.9687 18.9062C12.8148 18.9062 11.0623 17.1539 11.0623 15C11.0623 12.846 12.8148 11.0937 14.9687 11.0937C17.1227 11.0937 18.8751 12.846 18.8751 15C18.8751 17.1539 17.1227 18.9062 14.9687 18.9062ZM14.9687 12.3437C13.504 12.3437 12.3123 13.5354 12.3123 15C12.3123 16.4646 13.504 17.6562 14.9687 17.6562C16.4335 17.6562 17.625 16.4646 17.625 15C17.625 13.5354 16.4335 12.3437 14.9687 12.3437ZM19.3126 9.84371C18.7949 9.84371 18.3751 10.2634 18.3751 10.7812C18.3751 11.299 18.7949 11.7187 19.3126 11.7187C19.8304 11.7187 20.2501 11.299 20.2501 10.7812C20.2501 10.2634 19.8304 9.84371 19.3126 9.84371Z"
        fill="black"
      />
    </svg>
  );

  const houzzSVG = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="#999999" />
      <path
        d="M11.2333 10.7333V11.1098L11.5952 11.2139L21.9 14.1765V22.5H17.5667V17.6667V17.1667H17.0667H13.3333H12.8333V17.6667V22.5H8.5V7.5H11.2333V10.7333Z"
        stroke="black"
      />
    </svg>
  );

  const socialLinks = [
    { link: props.facebook, label: <div className="mr-3">{facebookSVG}</div> },
    { link: props.twitter, label: <div className="mr-3">{twitterSVG}</div> },
    {
      link: props.pinterest,
      label: <img className="mr-3" src={pinterest} alt="pinterest" />,
    },
    { link: props.instagram, label: <div className="mr-3">{instaSVG}</div> },
    { link: props.houzz, label: <div className="mr-3">{houzzSVG}</div> },
  ].filter((link) => link.link);

  const footerLinks = props.footerLinks || [];
  const linksBottom = props.linksBottom || [];

  const isDesktopBreakpoint = useBreakpoint("md");

  return (
    <footer className="Footer py-[26px] md:py-[28px] bg-black md:border-b-[10px] md:border-brand-primary">
      <div className="container">
        {isDesktopBreakpoint ? (
          <div className="flex">
            <div className="grow">
              <div className="pb-6">
                {props.logoLink && (
                  <Link href={props.logoLink} className="">
                    <img
                      className="max-w-[200px]"
                      src="https://cambriausa.widen.net/content/pvruomyo8g/webp/cambria_V_AmerMade_REV_solid_RGB_1600x523.webp?crop=true&anchor=67,136&color=ffffffff&u=f5mkho&w=1101&h=396"
                      alt="logo"
                    />
                  </Link>
                )}
              </div>
              <div className="flex flex-row items-center pb-6 w-[80%] flex-wrap gap-y-[10px]">
                {footerLinks.map((item, i) => (
                  <div key={item.label}>
                    {item.link == "https://www.google.com" ? (
                      <Link
                        className="Link Link--footer mb-4 md:mb-0 md:mr-4 tracking-[1.7px] text-[11px]"
                        href={props.linkToLocator}>
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        className="Link Link--footer mb-4 md:mb-0 md:mr-4 tracking-[1.7px] text-[11px]"
                        cta={item}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex text-white whitespace-nowrap">
                <div className="tracking-[1.7px] text-[21px] leading-[20px] font-medium uppercase pr-8">
                  1-866-Cambria
                </div>
                <div className="flex flex-wrap">
                  {linksBottom.map((link, i) => (
                    <Link
                      className="Link text-[12px] leading-[18px] px-2 tracking-[1.7px] font-secondary font-light border-r last:border-none hover:underline"
                      key={i}
                      cta={link}
                      eventName={`bottomlink${i}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="my-4 md:my-0 flex flex-row items-center">
                {socialLinks.map((socialLink, i) =>
                  socialLink.link ? (
                    <Link
                      className="Link Link--primary"
                      key={i}
                      href={socialLink.link}
                      eventName={`social${i}`}>
                      {socialLink.label}
                    </Link>
                  ) : null
                )}
              </div>
              <div className="flex flex-col gap-4 pt-4 w-fit">
                {props.cta1 && (
                  <Link
                    className="Button Button--primary uppercase w-[100%]"
                    cta={props.cta1}
                    eventName="cta1"
                  />
                )}
                {props.cta2 && (
                  <Link
                    className="Button Button--primary uppercase w-[100%]"
                    cta={props.cta2}
                    eventName="cta2"
                  />
                )}
              </div>
              <div className="flex flex-row pt-4 gap-6">
                <img className="max-w-[45px]" src={image} alt="footer image" />
                {props.googlePlay && (
                  <Link href={props.googlePlay} eventName="googlePlay">
                    <img
                      className="max-w-[125px]"
                      src={playStoreIcon}
                      alt="google play store icon"
                    />
                  </Link>
                )}
                {props.appleStore && (
                  <Link href={props.appleStore} eventName="appStore">
                    <img
                      className="max-w-[125px]"
                      src={appStoreIcon}
                      alt="app store icon"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white flex justify-center">
            <div className="uppercase tracking-[1.7px] font-medium flex text-[14px] underline mx-[26px]">
              <Link
                ng-href="tel:18662262742"
                target=""
                href="tel:18662262742"
                eventName="mobilePhone">
                1-866-CAMBRIA
              </Link>
            </div>
            {props.linksTop.map((item: CTA) => (
              <div key={item.label}>
                <Link
                  className="uppercase tracking-[1.7px] font-medium flex text-[14px] underline mx-[26px]"
                  cta={item}
                  eventName="mobileLink"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
