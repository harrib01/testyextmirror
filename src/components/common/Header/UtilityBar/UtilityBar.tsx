import React from "react";

const UtilityBar = () => {
  return (
    <div className="header-utility">
      <div className="header-utility__wrapper">
        <div className="utility-links-logo">
          <div className="links-container">
            <ul className="cmp-text">
              <li>
                <a href="/professionals">For Professionals</a>
              </li>
              <li>
                <a href="/news-events">News & Events</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/dealer-locator/locations">Find a Retailer</a>
              </li>
              <li>
                <a href="tel:tel:18662262742" className="font-bold">
                  1-866-CAMBRIA
                </a>
              </li>
            </ul>
          </div>
          <div className="logo-container">
            <img
              width={130}
              src="https://cambriausa.scene7.com/is/content/cambriacompanyllc/foam-h-rgb-small?ts=1701271475956&dpr=off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
