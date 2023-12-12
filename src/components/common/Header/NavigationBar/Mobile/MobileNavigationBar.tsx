import React, { useState } from "react";
import "../NavigationBar.css";
import { DropdownMenuOptions, MenuOption } from "../DropdownMenuOptions";
import MobileMenuDropdown from "./MobileMenuDropdown/MobileMenuDropdown";

const MobileNavigationBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div className="header-bar-mobile">
        <div className="header-bar-mobile__wrapper">
          <div className="header-bar-mobile__logo">
            <a className="logo-image" href="/">
              <img
                width={167}
                src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/header/master/_jcr_content/root/header/logo.coreimg.svg/1693941653530/cambria-h-rev-rgb.svg"
                loading="lazy"
                className="cmp-image__image"
                alt="Cambria Logo"
              />
            </a>
          </div>
          <div className="header-bar__nav flex">
            <button className="header-bar-mobile__nav-container">
              <span
                onClick={() => {
                  document.body.classList.add("disable-scroll");
                  setShowDropdown(!showDropdown);
                }}
                className="material-symbols-outlined">
                menu
              </span>
            </button>
          </div>
        </div>
      </div>
      {showDropdown && (
        <>
          <div className="dropdown-body-mobile">
            <div className="header-bar-mobile">
              <div className="header-bar-mobile__wrapper">
                <div className="header-bar-mobile__logo">
                  <a className="logo-image mr-[3rem]">
                    <img
                      width={110}
                      src="https://cambriausa.scene7.com/is/content/cambriacompanyllc/foam-h-rev-rgb?ts=1701720872898&dpr=off"
                      loading="lazy"
                      className="cmp-image__image"
                      alt="Cambria Logo"
                    />
                  </a>
                  <a className="font-bold text-[13.2px]">1-866-CAMBRIA</a>
                </div>
                <div className="header-bar__nav flex">
                  <div className="header-bar-mobile__nav-container">
                    <span
                      onClick={() => {
                        setShowDropdown(!showDropdown);
                        document.body.classList.remove("disable-scroll");
                      }}
                      className="material-symbols-outlined">
                      close
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="dropdown-body-mobile-list-container">
                <MobileMenuDropdown dropdownLabel="Our Products" dropdownOptions={DropdownMenuOptions.ourProducts} />
                <MobileMenuDropdown
                  dropdownLabel="Kitchens & Baths"
                  dropdownOptions={DropdownMenuOptions.kitchensAndBaths}
                />
                <MobileMenuDropdown
                  dropdownLabel="Unique Installs"
                  dropdownOptions={DropdownMenuOptions.uniqueInstalls}
                />
                <MobileMenuDropdown
                  dropdownLabel="Planning & Care"
                  dropdownOptions={DropdownMenuOptions.planningAndCare}
                />
                <MobileMenuDropdown
                  dropdownLabel="Trends & Articles"
                  dropdownOptions={DropdownMenuOptions.trendsAndArticles}
                />
                <MobileMenuDropdown dropdownLabel="Why Cambria" dropdownOptions={DropdownMenuOptions.whyCambria} />
                <MobileMenuDropdown dropdownLabel="Commercial" dropdownOptions={DropdownMenuOptions.commercial} />
                <MobileMenuDropdown
                  boldLabel={true}
                  dropdownLabel="Where to Buy"
                  dropdownOptions={DropdownMenuOptions.whereToBuy}
                />
              </div>
              <ul className="lower-menu-container">
                <li className="lower-menu-option">
                  <a href="/content/cusa/us.html">For Professionals</a>
                </li>
                <li className="lower-menu-option">
                  <a href="/content/cusa/us.html">News & Events</a>
                </li>
                <li className="lower-menu-option">
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNavigationBar;
