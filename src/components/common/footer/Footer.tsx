import React, { useState } from "react";
import { Link } from "@yext/pages/components";
import type { CTA } from "@yext/types";
import { useBreakpoint } from "src/common/useBreakpoints";
import image from "src/assets/images/footerImage.png";
import appStoreIcon from "src/assets/images/AppStoreButton.png";
import playStoreIcon from "src/assets/images/GooglePlayButton.png";
import pinterest from "src/assets/images/pinterest.png";
import "src/components/common/footer/Footer.css";

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
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="#999999" />
      <path
        d="M21.0688 11.1649L20.844 11.3276L20.8632 11.6044C20.8715 11.7254 20.8717 11.8492 20.8717 11.9944C20.8717 16.0572 17.8264 20.6977 12.2783 20.8314L12.031 20.8318C10.9958 20.8333 9.97386 20.652 9.01047 20.3013C10.1564 20.1004 11.242 19.6194 12.167 18.8929L13.2704 18.0264L11.8677 17.9998C10.9448 17.9823 10.11 17.5122 9.61116 16.774C9.87886 16.7597 10.1451 16.717 10.4052 16.6459L10.3725 15.6735C9.32377 15.4616 8.51285 14.6767 8.23979 13.6847C8.52434 13.7621 8.81811 13.8061 9.11516 13.815L10.8555 13.8669L9.40791 12.8995C8.393 12.2212 7.96071 10.9853 8.26516 9.85742C9.9912 11.6543 12.3454 12.7356 14.8545 12.861L15.5163 12.8941L15.3665 12.2486C15.1421 11.2819 15.4486 10.269 16.1715 9.58971L16.1715 9.58967C17.2926 8.53586 19.0556 8.59001 20.1092 9.71026L20.2987 9.91178L20.5701 9.85827C20.7906 9.81481 21.0084 9.76093 21.223 9.69692C21.1092 9.79281 20.9873 9.87998 20.8581 9.95728L21.1735 10.8828C21.2761 10.8707 21.3784 10.8564 21.4802 10.8398C21.3479 10.9538 21.2107 11.0622 21.0688 11.1649Z"
        stroke="black"
      />
    </svg>
  );

  const facebookSVG = (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="#999999" />
      <path
        d="M18.2792 7.59463C18.3811 7.60618 18.4749 7.61773 18.5586 7.62859V9.16094H17.7725C17.0333 9.16094 16.4656 9.39022 16.091 9.81563C15.727 10.229 15.6103 10.7545 15.6103 11.2253V13.1044V13.6044H16.1103H18.355L18.0588 15.5H16.1103H15.6103V16V22.5H13.4231V16V15.5H12.9231H10.8334V13.6044H12.9231H13.4231V13.1044V10.8975C13.4231 9.74456 13.7704 8.91024 14.3262 8.36382C14.8837 7.81579 15.7092 7.5 16.7756 7.5C17.3074 7.5 17.8576 7.54682 18.2792 7.59463Z"
        stroke="black"
      />
    </svg>
  );

  const instaSVG = (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="#999999" />
      <path
        d="M15.1578 23C15.1048 23 15.0518 23 14.9985 22.9998C13.7443 23.0028 12.5854 22.9709 11.4584 22.9023C10.4252 22.8395 9.48203 22.4824 8.73078 21.8699C8.0059 21.2788 7.51088 20.4796 7.25953 19.4947C7.04077 18.6373 7.02918 17.7956 7.01807 16.9816C7.01001 16.3974 7.00171 15.7053 7 15.0014C7.00171 14.2947 7.01001 13.6025 7.01807 13.0184C7.02918 12.2044 7.04077 11.3628 7.25953 10.5052C7.51088 9.52035 8.0059 8.72115 8.73078 8.13009C9.48203 7.51753 10.4252 7.16048 11.4585 7.09761C12.5855 7.02913 13.7446 6.99715 15.0015 7.0002C16.2561 6.99751 17.4146 7.02913 18.5416 7.09761C19.5748 7.16048 20.518 7.51753 21.2692 8.13009C21.9942 8.72115 22.4891 9.52035 22.7405 10.5052C22.9592 11.3626 22.9708 12.2044 22.9819 13.0184C22.99 13.6025 22.9984 14.2947 23 14.9985V15.0014C22.9984 15.7053 22.99 16.3974 22.9819 16.9816C22.9708 17.7955 22.9593 18.6372 22.7405 19.4947C22.4891 20.4796 21.9942 21.2788 21.2692 21.8699C20.518 22.4824 19.5748 22.8395 18.5416 22.9023C17.4623 22.968 16.3536 23 15.1578 23ZM14.9985 21.7498C16.2323 21.7527 17.3651 21.7216 18.4656 21.6547C19.2469 21.6072 19.9243 21.3536 20.4793 20.9011C20.9922 20.4828 21.3455 19.9056 21.5292 19.1857C21.7114 18.4719 21.7219 17.7056 21.732 16.9645C21.7399 16.3843 21.7482 15.697 21.75 15C21.7482 14.3028 21.7399 13.6157 21.732 13.0355C21.7219 12.2944 21.7114 11.528 21.5292 10.8142C21.3455 10.0942 20.9922 9.51705 20.4793 9.09872C19.9243 8.64632 19.2469 8.39278 18.4656 8.3453C17.3651 8.27828 16.2323 8.2474 15.0014 8.25008C13.7678 8.24715 12.6349 8.27828 11.5344 8.3453C10.7531 8.39278 10.0757 8.64632 9.52073 9.09872C9.00777 9.51705 8.65448 10.0942 8.47076 10.8142C8.28862 11.528 8.27812 12.2943 8.26799 13.0355C8.26006 13.6162 8.25176 14.3038 8.25005 15.0014C8.25176 15.696 8.26006 16.3838 8.26799 16.9645C8.27812 17.7056 8.28862 18.4719 8.47076 19.1857C8.65448 19.9056 9.00777 20.4828 9.52073 20.9011C10.0757 21.3535 10.7531 21.6071 11.5344 21.6545C12.6349 21.7216 13.7681 21.7528 14.9985 21.7498ZM14.9687 18.9062C12.8148 18.9062 11.0623 17.1539 11.0623 15C11.0623 12.846 12.8148 11.0937 14.9687 11.0937C17.1227 11.0937 18.8751 12.846 18.8751 15C18.8751 17.1539 17.1227 18.9062 14.9687 18.9062ZM14.9687 12.3437C13.504 12.3437 12.3123 13.5354 12.3123 15C12.3123 16.4646 13.504 17.6562 14.9687 17.6562C16.4335 17.6562 17.625 16.4646 17.625 15C17.625 13.5354 16.4335 12.3437 14.9687 12.3437ZM19.3126 9.84371C18.7949 9.84371 18.3751 10.2634 18.3751 10.7812C18.3751 11.299 18.7949 11.7187 19.3126 11.7187C19.8304 11.7187 20.2501 11.299 20.2501 10.7812C20.2501 10.2634 19.8304 9.84371 19.3126 9.84371Z"
        fill="black"
      />
    </svg>
  );

  const houzzSVG = (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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

  const isDesktopBreakpoint = useBreakpoint("lg");

  const [getInTouchIsOpen, setGetInTouchIsOpen] = useState(false);
  const [getCambriaIsOpen, setGetCambriaIsOpen] = useState(false);
  const [forProIsOpen, setForProIsOpen] = useState(false);

  type PanelOptions = "getInTouch" | "getCambria" | "forPros";
  const handlePanelOpening = (panelToOpen: PanelOptions) => {
    setGetInTouchIsOpen(false);
    setGetCambriaIsOpen(false);
    setForProIsOpen(false);

    if (panelToOpen === "getInTouch" && !getInTouchIsOpen) {
      setGetInTouchIsOpen(true);
      return;
    }
    if (panelToOpen === "getCambria" && !getCambriaIsOpen) {
      setGetCambriaIsOpen(true);
      return;
    }
    if (panelToOpen === "forPros" && !forProIsOpen) {
      setForProIsOpen(true);
      return;
    }
  };

  return (
    <footer className="Footer bg-black">
      <div className="flex lg:px-[4.375rem] lg:py-[4.375rem] justify-center">
        {isDesktopBreakpoint ? (
          // Desktop
          <div className="desktop-footer-container flex flex-col text-white w-full">
            <div className="flex w-full justify-between">
              <div className="container-left flex flex-col">
                <div className="flex">
                  <div className="flex flex-col mr-[4.875rem]">
                    <div className="font-medium mb-[1.25rem]">Get in Touch</div>
                    <div>
                      <ul className="text-[1.125rem]">
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/contact.html"
                            className="footer-list-item">
                            Contact Us
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/careers"
                            className="footer-list-item">
                            Careers
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/cambriacares"
                            className="footer-list-item">
                            CambriaCares
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/email-subscribe"
                            className="footer-list-item">
                            Subscribe to Emails
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/legend-of-cambria"
                            className="footer-list-item italic">
                            Legend of Cambria Film
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col mr-[4.875rem]">
                    <div className="font-medium mb-[1.25rem]">Get Cambria</div>
                    <div>
                      <ul className="text-[1.125rem]">
                        <li className="mb-[1.25rem]">
                          <a href="https://shop.cambriausa.com" className="footer-list-item">
                            Order a Sample
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a href="https://shop.cambriausa.com/collections/home-decor" className="footer-list-item">
                            Shop Home Decor
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/dealer-locator"
                            className="footer-list-item">
                            Find a Dealer
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/dealer-locator/galleries-showrooms"
                            className="footer-list-item">
                            Galleries & Showrooms
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/consultation"
                            className="footer-list-item">
                            Schedule a Consultation
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col mr-[9.25rem]">
                    <div className="font-medium mb-[1.25rem]">For Professionals</div>
                    <div>
                      <ul className="text-[1.125rem]">
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://cambriausa.widencollective.com/portals/zybivkom/cambriaportal"
                            className="footer-list-item">
                            Trade Portal
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://cambriausa.widencollective.com/portals/view/access-code/?portalShortcode=cnm8kccc&returnUri=%2Fportals%2Fcnm8kccc%2FPremierDealerPortal"
                            className="footer-list-item">
                            Premier Partner Portal
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a href="https://commerce.cambriausa.com/" className="footer-list-item">
                            The CambriaExchange
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/professionals/silica-safety"
                            className="footer-list-item">
                            Silica Safety
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://www.cambriausa.com/dealer-locator/pro-locations"
                            className="footer-list-item">
                            Find a Fabricator
                          </a>
                        </li>
                        <li className="mb-[1.25rem]">
                          <a
                            href="https://publish-p108958-e1076754.adobeaemcloud.com/quartz-countertops/submit-project"
                            className="footer-list-item">
                            Submit Your Project
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex copyright-list footer-subtext-items mt-[4.375rem]">
                  <ul className="flex">
                    <li>
                      <a href="https://publish-p108958-e1076754.adobeaemcloud.com">© 2023 Cambria</a>
                    </li>
                    <li className="copyright-list-item">
                      <a href="https://publish-p108958-e1076754.adobeaemcloud.com/privacy">Privacy Notice</a>
                    </li>
                    <li className="copyright-list-item">
                      <a href="https://publish-p108958-e1076754.adobeaemcloud.com/terms-conditions">
                        Terms & Conditions
                      </a>
                    </li>
                    <li className="copyright-list-item">
                      <a href="https://publish-p108958-e1076754.adobeaemcloud.com/accessibility">Accessibility</a>
                    </li>
                    <li className="copyright-list-item">
                      <a href="https://publish-p108958-e1076754.adobeaemcloud.com/transparency-in-coverage">
                        Transparency in Coverage
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="container-right footer-subtext-items flex flex-col w-1/3 justify-between">
                <div>
                  <a href="https://publish-p108958-e1076754.adobeaemcloud.com">
                    <img
                      width={253}
                      alt="Cambria USA Logo"
                      src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/logo.coreimg.svg/1697136034845/cambria-h-rev-rgb.svg"
                    />
                  </a>
                </div>
                <div>
                  <div>Cambria inspiration delivered</div>
                  <div className="mt-[1rem]">
                    <a className="email-signup-btn">Sign up for Cambria emails today</a>
                  </div>
                </div>
                <div className="">
                  <div className="footer-subtext-items">Get the Cambria AR App</div>
                  <div className="flex mt-[0.5rem]">
                    <img className="mr-[1rem]" width={107} src={playStoreIcon} />
                    <img width={107} src={appStoreIcon} />
                  </div>
                </div>
                <div className="flex ">
                  <div className="flex flex-col pr-[2rem]">
                    <div>Follow</div>
                    <div className="flex items-center mt-[0.5rem]">
                      <a href="https://www.pinterest.com/cambriasurfaces/">
                        <img
                          className="mr-[1.125rem]"
                          width={17}
                          src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/pinterest-logo.coreimg.svg/1692909190892/icon-pinterest.svg"
                        />
                      </a>
                      <a href="https://www.instagram.com/cambriasurfaces/">
                        <img
                          className="mr-[1.125rem]"
                          width={17}
                          src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/instagram-logo.coreimg.svg/1692909235938/icon-instagram.svg"
                        />
                      </a>
                      <a href="https://www.facebook.com/CambriaSurfaces">
                        <img
                          className="mr-[1.125rem]"
                          width={17}
                          src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/facebook-logo.coreimg.svg/1692909262633/icon-facebook.svg"
                        />
                      </a>
                      <a href="https://www.linkedin.com/company/cambria">
                        <img
                          className="mr-[1.125rem]"
                          width={17}
                          src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/linkedin-logo.coreimg.svg/1692909313073/icon-linkedin.svg"
                        />
                      </a>
                      <a href="https://twitter.com/CambriaSurfaces">
                        <img
                          className="mr-[1.125rem]"
                          width={17}
                          src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/twitter-logo.coreimg.svg/1692909366238/icon-twitter.svg"
                        />
                      </a>
                      <a href="https://www.youtube.com/channel/UCrNUaYClqpTTJEDkKIH2vKw">
                        <img
                          className="mr-[1.125rem]"
                          width={17}
                          src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/youtube-logo.coreimg.svg/1692909414423/icon-youtube.svg"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <a href="https://publish-p108958-e1076754.adobeaemcloud.com">
                      <img
                        width={110}
                        alt="Made in America Logo"
                        src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/american-made-logo.coreimg.svg/1692909426039/american-made-h-rev-rgb.svg"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile
          <div className="text-white flex flex-col w-full">
            <div className="mobile-footer-menu-option" onClick={() => handlePanelOpening("getInTouch")}>
              <div className="flex justify-between">
                Get in Touch{" "}
                <i className="material-symbols-outlined">
                  {getInTouchIsOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}
                </i>
              </div>
              <div className="footer-dropdown-menu-panel mt-[2rem] pl-[2rem]" hidden={!getInTouchIsOpen}>
                <ul>
                  <li className="mb-[2rem]">
                    <a
                      href="https://publish-p108958-e1076754.adobeaemcloud.com/contact.html"
                      className="footer-list-item">
                      Contact Us
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="https://publish-p108958-e1076754.adobeaemcloud.com/careers" className="footer-list-item">
                      Careers
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a
                      href="https://publish-p108958-e1076754.adobeaemcloud.com/cambriacares"
                      className="footer-list-item">
                      CambriaCares
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a
                      href="https://publish-p108958-e1076754.adobeaemcloud.com/email-subscribe"
                      className="footer-list-item">
                      Subscribe to Emails
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a
                      href="https://publish-p108958-e1076754.adobeaemcloud.com/legend-of-cambria"
                      className="footer-list-item italic">
                      Legend of Cambria Film
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mobile-footer-menu-option" onClick={() => handlePanelOpening("getCambria")}>
              <div className="flex justify-between">
                Get Cambria
                <i className="material-symbols-outlined">
                  {getCambriaIsOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}
                </i>
              </div>
              <div hidden={!getCambriaIsOpen} className="footer-dropdown-menu-panel mt-[2rem] pl-[2rem]">
                <ul>
                  <li className="mb-[2rem]">
                    <a href="https://shop.cambriausa.com" className="footer-list-item">
                      Order a Sample
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="https://shop.cambriausa.com/collections/home-decor" className="footer-list-item">
                      Shop Home Decor
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a
                      href="https://publish-p108958-e1076754.adobeaemcloud.com/dealer-locator"
                      className="footer-list-item">
                      Find a Dealer
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a
                      href="https://publish-p108958-e1076754.adobeaemcloud.com/dealer-locator/galleries-showrooms"
                      className="footer-list-item">
                      Galleries & Showrooms
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a
                      href="https://publish-p108958-e1076754.adobeaemcloud.com/consultation"
                      className="footer-list-item">
                      Schedule a Consultation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mobile-footer-menu-option" onClick={() => handlePanelOpening("forPros")}>
              <div className="flex justify-between">
                For Professionals
                <i className="material-symbols-outlined">
                  {forProIsOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}
                </i>
              </div>
              <div hidden={!forProIsOpen} className="footer-dropdown-menu-panel mt-[2rem] pl-[2rem]">
                <ul>
                  <li className="mb-[2rem]">
                    <a
                      href="https://cambriausa.widencollective.com/portals/zybivkom/cambriaportal"
                      className="footer-list-item">
                      Trade Portal
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a
                      href="https://cambriausa.widencollective.com/portals/view/access-code/?portalShortcode=cnm8kccc&returnUri=%2Fportals%2Fcnm8kccc%2FPremierDealerPortal"
                      className="footer-list-item">
                      Premier Partner Portal
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="https://commerce.cambriausa.com/" className="footer-list-item">
                      The CambriaExchange
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a
                      href="https://publish-p108958-e1076754.adobeaemcloud.com/professionals/silica-safety"
                      className="footer-list-item">
                      Silica Safety
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="https://www.cambriausa.com/dealer-locator/pro-locations" className="footer-list-item">
                      Find a Fabricator
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a
                      href="https://publish-p108958-e1076754.adobeaemcloud.com/quartz-countertops/submit-project"
                      className="footer-list-item">
                      Submit Your Project
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mobile-copyright-container">
              <div className="footer-subtext-items">
                <a href="https://publish-p108958-e1076754.adobeaemcloud.com">© 2023 Cambria</a>
              </div>
              <div className="flex copyright-list justify-center footer-subtext-items mt-[1rem]">
                <div className="flex mr-[0.5rem]">
                  <ul className="flex">
                    <li>
                      <a href="https://publish-p108958-e1076754.adobeaemcloud.com/privacy">Privacy Notice</a>
                    </li>
                    <li className="copyright-list-item">
                      <a href="https://publish-p108958-e1076754.adobeaemcloud.com/terms-conditions">
                        Terms & Conditions
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex ml-[0.5rem]">
                  <ul className="flex">
                    <li>
                      <a href="https://publish-p108958-e1076754.adobeaemcloud.com/accessibility">Accessibility</a>
                    </li>
                    <li className="copyright-list-item">
                      <a href="https://publish-p108958-e1076754.adobeaemcloud.com/transparency-in-coverage">
                        Transparency in Coverage
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center py-[3.125rem] px-[1.875rem]">
              <div className="mb-[3rem]">
                <a href="https://publish-p108958-e1076754.adobeaemcloud.com">
                  <img
                    width={253}
                    alt="Cambria USA Logo"
                    src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/logo.coreimg.svg/1697136034845/cambria-h-rev-rgb.svg"
                  />
                </a>
              </div>
              <div className="mb-[3rem]">
                <div className="footer-subtext-items">Cambria inspiration delivered</div>
                <div className="mt-[0.5rem]">
                  <a className="email-signup-btn">Sign up for Cambria emails today</a>
                </div>
              </div>
              <div className="mb-[2.8125rem]">
                <div className="footer-subtext-items">Get the Cambria AR App</div>
                <div className="flex mt-[0.5rem]">
                  <img className="mr-[1rem]" width={107} src={playStoreIcon} />
                  <img width={107} src={appStoreIcon} />
                </div>
              </div>
              <div className="flex flex-col w-full items-center">
                <div className="footer-subtext-items w-full ml-[0.5rem]">Follow</div>
                <div className="flex mt-[0.5rem] items-center">
                  <a href="https://www.pinterest.com/cambriasurfaces/">
                    <img
                      className="mr-[2.5rem] w-[1.25rem]"
                      src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/pinterest-logo.coreimg.svg/1692909190892/icon-pinterest.svg"
                    />
                  </a>
                  <a href="https://www.instagram.com/cambriasurfaces/">
                    <img
                      className="mr-[2.5rem] w-[1.25rem]"
                      src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/instagram-logo.coreimg.svg/1692909235938/icon-instagram.svg"
                    />
                  </a>
                  <a href="https://www.facebook.com/CambriaSurfaces">
                    <img
                      className="mr-[2.5rem] w-[1.25rem]"
                      src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/facebook-logo.coreimg.svg/1692909262633/icon-facebook.svg"
                    />
                  </a>
                  <a href="https://www.linkedin.com/company/cambria">
                    <img
                      className="mr-[2.5rem] w-[1.25rem]"
                      src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/linkedin-logo.coreimg.svg/1692909313073/icon-linkedin.svg"
                    />
                  </a>
                  <a href="https://twitter.com/CambriaSurfaces">
                    <img
                      className="mr-[2.5rem] w-[1.25rem]"
                      src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/twitter-logo.coreimg.svg/1692909366238/icon-twitter.svg"
                    />
                  </a>
                  <a href="https://www.youtube.com/channel/UCrNUaYClqpTTJEDkKIH2vKw">
                    <img
                      className="w-[1.25rem]"
                      src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/youtube-logo.coreimg.svg/1692909414423/icon-youtube.svg"
                    />
                  </a>
                </div>
              </div>
              <div className="mt-[3.12rem] flex justify-start w-full">
                <a href="https://publish-p108958-e1076754.adobeaemcloud.com">
                  <img
                    width={112}
                    alt="Made in America Logo"
                    src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/american-made-logo.coreimg.svg/1692909426039/american-made-h-rev-rgb.svg"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;