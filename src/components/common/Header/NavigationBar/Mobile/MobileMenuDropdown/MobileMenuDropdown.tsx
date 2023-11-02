import React, { useState } from "react";
import { MenuOption } from "../../DropdownMenuOptions";
import "./MobileMenuDropdown.css";

interface MobileMenuDropdownProps {
  dropdownLabel: string;
  dropdownOptions: MenuOption[];
  boldLabel?: boolean;
}

const MobileMenuDropdown = ({ dropdownLabel, dropdownOptions, boldLabel }: MobileMenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`mobile-menu-dropdown ${isOpen ? "underline" : ""} ${boldLabel ? "font-bold" : ""}`}
        onClick={() => setIsOpen(!isOpen)}>
        {dropdownLabel}
      </div>
      {isOpen && (
        <div className="w-full dropdown-body-container">
          <ul className="mobile-menu-dropdown-list w-full">
            {dropdownOptions.map((option: MenuOption, i) => {
              return (
                <li key={i} className="mobile-menu-dropdown-list-item">
                  <a href={option.link}>{option.text}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileMenuDropdown;
