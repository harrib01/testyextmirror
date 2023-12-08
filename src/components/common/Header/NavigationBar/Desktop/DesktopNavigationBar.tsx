import React, { useState } from "react";
import "../NavigationBar.css";
import { DropdownMenuOptions, DropdownPicture, DropdownPictureOptions, MenuOption } from "../DropdownMenuOptions";

const DesktopNavigationBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeDropdownOptions, setActiveDropdownOptions] = useState<MenuOption[]>([]);
  const [activeDropdownPicture, setActiveDropdownPicture] = useState<DropdownPicture | null>(null);

  return (
    <div className="header-bar">
      <div className="header-bar__wrapper">
        <div className="header-bar__logo">
          <a className="logo-image" href="/">
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
              <li
                className="flex flex-col"
                onMouseEnter={() => {
                  setActiveDropdownPicture(DropdownPictureOptions.ourProducts);
                  setActiveDropdownOptions(DropdownMenuOptions.ourProducts);
                }}>
                Our Products
              </li>
              <li
                className="flex flex-col"
                onMouseEnter={() => {
                  setActiveDropdownPicture(DropdownPictureOptions.kitchensAndBaths);
                  setActiveDropdownOptions(DropdownMenuOptions.kitchensAndBaths);
                }}>
                Kitchens & Baths
              </li>
              <li
                className="flex flex-col"
                onMouseEnter={() => {
                  setActiveDropdownPicture(DropdownPictureOptions.uniqueInstalls);
                  setActiveDropdownOptions(DropdownMenuOptions.uniqueInstalls);
                }}>
                Unique Installs
              </li>
              <li
                className="flex flex-col"
                onMouseEnter={() => {
                  setActiveDropdownPicture(DropdownPictureOptions.planningAndCare);
                  setActiveDropdownOptions(DropdownMenuOptions.planningAndCare);
                }}>
                Planning & Care
              </li>
              <li
                className="flex flex-col"
                onMouseEnter={() => {
                  setActiveDropdownPicture(DropdownPictureOptions.trendsAndArticles);
                  setActiveDropdownOptions(DropdownMenuOptions.trendsAndArticles);
                }}>
                Trends & Articles
              </li>
              <li
                className="flex flex-col"
                onMouseEnter={() => {
                  setActiveDropdownPicture(DropdownPictureOptions.whyCambria);
                  setActiveDropdownOptions(DropdownMenuOptions.whyCambria);
                }}>
                Why Cambria
              </li>
              <li
                className="flex flex-col"
                onMouseEnter={() => {
                  setActiveDropdownPicture(DropdownPictureOptions.commercial);
                  setActiveDropdownOptions(DropdownMenuOptions.commercial);
                }}>
                Commercial
              </li>
              <li
                className="flex flex-col font-bold"
                onMouseEnter={() => {
                  setActiveDropdownPicture(DropdownPictureOptions.whereToBuy);
                  setActiveDropdownOptions(DropdownMenuOptions.whereToBuy);
                }}>
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
                {activeDropdownPicture && (
                  <div className="dropdown-image-container">
                    <a href={activeDropdownPicture.imageLink}>
                      <img src={activeDropdownPicture.imageUrl} />
                    </a>
                    <a className="pt-[1.5rem]" href={activeDropdownPicture.imageLink}>
                      {activeDropdownPicture.imageLabel}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopNavigationBar;
