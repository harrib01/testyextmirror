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
                <a href="tel:tel:18662262742" className="font-bold">
                  1-866-CAMBRIA
                </a>
              </li>
            </ul>
          </div>
          <div className="logo-container">
            <img src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/header/master/_jcr_content/root/header/utility-logo.coreimg.svg/1693941517460/american-made-h-rgb.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
