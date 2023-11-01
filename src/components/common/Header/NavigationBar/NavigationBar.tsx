import React, { useState } from "react";
import "./NavigationBar.css";
import { DropdownMenuOptions, MenuOption } from "./DropdownMenuOptions";

const NavigationBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeDropdownOptions, setActiveDropdownOptions] = useState<MenuOption[]>([]);

  return (
    <div className="header-bar">
      <div className="header-bar__wrapper">
        <div className="header-bar__logo">
          <a className="logo-image">
            <img
              width={180}
              src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/header/master/_jcr_content/root/header/logo.coreimg.svg/1693941653530/cambria-h-rev-rgb.svg"
              loading="lazy"
              className="cmp-image__image"
              alt="Cambria Logo"
            />
          </a>
        </div>
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          className="header-bar__nav flex">
          <div className="header-bar__nav-container">
            <ul className="nav-list-container">
              <li onMouseEnter={() => setActiveDropdownOptions(DropdownMenuOptions.ourProducts)}>Our Products</li>
              <li onMouseEnter={() => setActiveDropdownOptions(DropdownMenuOptions.kitchensAndBaths)}>
                Kitchens & Baths
              </li>
              <li onMouseEnter={() => setActiveDropdownOptions(DropdownMenuOptions.uniqueInstalls)}>Unique Installs</li>
              <li onMouseEnter={() => setActiveDropdownOptions(DropdownMenuOptions.planningAndCare)}>
                Planning & Care
              </li>
              <li onMouseEnter={() => setActiveDropdownOptions(DropdownMenuOptions.trendsAndArticles)}>
                Trends & Articles
              </li>
              <li onMouseEnter={() => setActiveDropdownOptions(DropdownMenuOptions.whyCambria)}>Why Cambria</li>
              <li onMouseEnter={() => setActiveDropdownOptions(DropdownMenuOptions.commercial)}>Commercial</li>
              <li className="font-bold" onMouseEnter={() => setActiveDropdownOptions(DropdownMenuOptions.whereToBuy)}>
                Where to Buy
              </li>
            </ul>
          </div>
          {showDropdown && (
            <div className="dropdown-body">
              <div className="dropdown-body-list-container">
                <ul className="dropdown-list">
                  {activeDropdownOptions.map((option: MenuOption, i) => {
                    return (
                      <li key={i} className="navigation-item">
                        <a href={option.link}>{option.text}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
