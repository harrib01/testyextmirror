import React, { useState } from "react";
import { useBreakpoint } from "src/common/useBreakpoints";
import appStoreIcon from "src/assets/images/AppStoreButton.png";
import "src/components/common/footer/Footer.css";

const Footer = () => {
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
    <footer className="Footer bg-black flex justify-center">
      <div className="desktop-footer-container flex lg:py-[4.375rem] justify-between w-full">
        {isDesktopBreakpoint ? (
          <>
            <div className="container-left flex flex-col text-white">
              <div className="flex">
                <div className="flex flex-col mr-[4.8rem]">
                  <h6 className="font-medium mb-[1.25rem] leading-[1.5rem]">Get in Touch</h6>
                  <div>
                    <ul className="text-[1rem]">
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/contact.html" className="footer-list-item">
                          Contact Us
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/careers" className="footer-list-item">
                          Careers
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/cambriacares" className="footer-list-item">
                          CambriaCares
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/email-subscribe" className="footer-list-item">
                          Subscribe to Emails
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col mr-[4.8rem]">
                  <h6 className="font-medium mb-[1.25rem]">Get Cambria</h6>
                  <div>
                    <ul className="text-[1rem]">
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="https://shop.cambriausa.com" className="footer-list-item">
                          Order a Sample
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="https://shop.cambriausa.com/collections/home-decor" className="footer-list-item">
                          Shop Home Decor
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/dealer-locator" className="footer-list-item">
                          Find a Dealer
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/dealer-locator/galleries-showrooms" className="footer-list-item">
                          Galleries & Showrooms
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/consultation" className="footer-list-item">
                          Schedule a Consultation
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col mr-[4.8rem]">
                  <h6 className="font-medium mb-[1.25rem]">For Professionals</h6>
                  <div>
                    <ul className="text-[1rem]">
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a
                          href="https://cambriausa.widencollective.com/portals/zybivkom/cambriaportal"
                          className="footer-list-item">
                          Trade Portal
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a
                          href="https://cambriausa.widencollective.com/portals/view/access-code/?portalShortcode=cnm8kccc&returnUri=%2Fportals%2Fcnm8kccc%2FPremierDealerPortal"
                          className="footer-list-item">
                          Premier Partner Portal
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="https://commerce.cambriausa.com/" className="footer-list-item">
                          The CambriaExchange
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/professionals/silica-safety" className="footer-list-item">
                          Silica Safety
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/dealer-locator/pro-locations" className="footer-list-item">
                          Find a Fabricator
                        </a>
                      </li>
                      <li className="mb-[1.25rem] leading-[1.125rem]">
                        <a href="/quartz-countertops/submit-project" className="footer-list-item">
                          Submit Your Project
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex copyright-list footer-subtext-items mt-[3.225rem]">
                <ul className="flex">
                  <li>
                    <a className="cambria-copyright-text" href="/">
                      © 2023 Cambria
                    </a>
                  </li>
                  <li className="copyright-list-item">
                    <a href="/privacy">Privacy Notice</a>
                  </li>
                  <li className="copyright-list-item">
                    <a href="/terms-conditions">Terms & Conditions</a>
                  </li>
                  <li className="copyright-list-item">
                    <a href="/accessibility">Accessibility</a>
                  </li>
                  <li className="copyright-list-item">
                    <a href="/transparency-in-coverage">Transparency in Coverage</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="container-right footer-subtext-items flex flex-col justify-between">
              <div>
                <a href="/">
                  <img
                    width={254}
                    alt="Cambria USA Logo"
                    src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/logo.coreimg.svg/1685976127477/cambria-logo.svg"
                  />
                </a>
              </div>
              <div className="pl-[0.625rem]">
                <div>Cambria inspiration delivered</div>
                <div className="mt-[1rem] email-signup-btn">
                  <a className="" href="/email-subscribe">
                    Sign up for Cambria emails today
                  </a>
                </div>
              </div>
              <div>
                <div className="footer-subtext-items">Get the Cambria AR App</div>
                <div className="flex mt-[0.5rem]">
                  <a href="/trends-articles/blog">
                    <img width={107} src={appStoreIcon} />
                  </a>
                </div>
              </div>
              <div className="flex ">
                <div className="flex flex-col pr-[2rem]">
                  <div>Follow</div>
                  <div className="flex items-center mt-[0.5rem]">
                    <a href="https://www.pinterest.com/cambriasurfaces/">
                      <img
                        className="mr-[1.25rem]"
                        width={20}
                        src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/pinterest-logo.coreimg.svg/1692909190892/icon-pinterest.svg"
                      />
                    </a>
                    <a href="https://www.instagram.com/cambriasurfaces/">
                      <img
                        className="mr-[1.25rem]"
                        width={20}
                        src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/instagram-logo.coreimg.svg/1692909235938/icon-instagram.svg"
                      />
                    </a>
                    <a href="https://www.facebook.com/CambriaSurfaces">
                      <img
                        className="mr-[1.25rem]"
                        width={20}
                        src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/facebook-logo.coreimg.svg/1692909262633/icon-facebook.svg"
                      />
                    </a>
                    <a href="https://www.linkedin.com/company/cambria">
                      <img
                        className="mr-[1.25rem]"
                        width={20}
                        src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/linkedin-logo.coreimg.svg/1692909313073/icon-linkedin.svg"
                      />
                    </a>
                    <a href="https://twitter.com/CambriaSurfaces">
                      <img
                        className="mr-[1.25rem]"
                        width={20}
                        src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/twitter-logo.coreimg.svg/1692909366238/icon-twitter.svg"
                      />
                    </a>
                    <a href="https://www.youtube.com/channel/UCrNUaYClqpTTJEDkKIH2vKw">
                      <img
                        className="mr-[1.25rem]"
                        width={20}
                        src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/youtube-logo.coreimg.svg/1692909414423/icon-youtube.svg"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex items-end">
                  <a href="/">
                    <img
                      width={110}
                      alt="Made in America Logo"
                      src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/american-made-logo.coreimg.svg/1692909426039/american-made-h-rev-rgb.svg"
                    />
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-white flex flex-col w-full">
            <div className="mobile-footer-menu-option" onClick={() => handlePanelOpening("getInTouch")}>
              <div className="flex justify-between">
                Get in Touch
                <i className={`material-symbols-outlined ${getInTouchIsOpen ? "rotate-arrow-down" : "arrow-right"}`}>
                  arrow_forward_ios
                </i>
              </div>
              <div className="footer-dropdown-menu-panel mt-[2rem] pl-[2rem]" hidden={!getInTouchIsOpen}>
                <ul>
                  <li className="mb-[2rem]">
                    <a href="/contact.html" className="footer-list-item">
                      Contact Us
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="/careers" className="footer-list-item">
                      Careers
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="/cambriacares" className="footer-list-item">
                      CambriaCares
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="/email-subscribe" className="footer-list-item">
                      Subscribe to Emails
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="/legend-of-cambria" className="footer-list-item">
                      Legend of Cambria Film
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mobile-footer-menu-option" onClick={() => handlePanelOpening("getCambria")}>
              <div className="flex justify-between">
                Get Cambria
                <i className={`material-symbols-outlined ${getCambriaIsOpen ? "rotate-arrow-down" : "arrow-right"}`}>
                  arrow_forward_ios
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
                    <a href="/dealer-locator" className="footer-list-item">
                      Find a Dealer
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="/dealer-locator/galleries-showrooms" className="footer-list-item">
                      Galleries & Showrooms
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="/consultation" className="footer-list-item">
                      Schedule a Consultation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mobile-footer-menu-option" onClick={() => handlePanelOpening("forPros")}>
              <div className="flex justify-between">
                For Professionals
                <i className={`material-symbols-outlined ${forProIsOpen ? "rotate-arrow-down" : "arrow-right"}`}>
                  arrow_forward_ios
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
                    <a href="/professionals/silica-safety" className="footer-list-item">
                      Silica Safety
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="/dealer-locator/pro-locations" className="footer-list-item">
                      Find a Fabricator
                    </a>
                  </li>
                  <li className="mb-[2rem]">
                    <a href="/quartz-countertops/submit-project" className="footer-list-item">
                      Submit Your Project
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mobile-copyright-container">
              <div className="footer-subtext-items leading-[1.125rem]">
                <a href="/">© 2023 Cambria</a>
              </div>
              <div className="flex copyright-list justify-center footer-subtext-items">
                <div className="flex mr-[0.4375rem]">
                  <ul className="flex leading-[1.125rem]">
                    <li>
                      <a href="/privacy">Privacy Notice</a>
                    </li>
                    <li className="copyright-list-item">
                      <a href="/terms-conditions">Terms & Conditions</a>
                    </li>
                  </ul>
                </div>
                <div className="flex ml-[0.4375rem]">
                  <ul className="flex leading-[1.125rem]">
                    <li>
                      <a href="/accessibility">Accessibility</a>
                    </li>
                    <li className="copyright-list-item">
                      <a href="/transparency-in-coverage">Transparency in Coverage</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center py-[3.125rem] px-[1.875rem]">
              <div className="mb-[3rem]">
                <a href="/">
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
                  <a className="email-signup-btn" href="/email-subscribe">
                    Sign up for Cambria emails today
                  </a>
                </div>
              </div>
              <div className="mb-[2.8125rem]">
                <div className="footer-subtext-items">Get the Cambria AR App</div>
                <div className="flex mt-[0.5rem]">
                  <a href="/trends-articles/blog">
                    <img width={107} src={appStoreIcon} />
                  </a>
                </div>
              </div>
              <div className="flex flex-col w-fit items-center">
                <div className="footer-subtext-items w-full lg:ml-[0.5rem]">Follow</div>
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
                <div className="mt-[3.12rem] flex justify-start w-full">
                  <a href="/">
                    <img
                      width={112}
                      alt="Made in America Logo"
                      src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/footer/master/_jcr_content/root/footer/american-made-logo.coreimg.svg/1692909426039/american-made-h-rev-rgb.svg"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
