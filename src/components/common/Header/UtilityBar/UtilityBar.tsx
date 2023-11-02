import React from "react";

const UtilityBar = () => {
  return (
    <div className="header-utility">
      <div className="header-utility__wrapper">
        <div className="utility-links-logo">
          <div className="links-container">
            <ul className="cmp-text">
              <li>
                <a>For Professionals</a>
              </li>
              <li>
                <a>News & Events</a>
              </li>
              <li>
                <a>Contact Us</a>
              </li>
              <li>
                <a>1-866-CAMBRIA</a>
              </li>
            </ul>
          </div>
          <div className="logo-container">
            <a>
              <img src="https://publish-p108958-e1076754.adobeaemcloud.com/content/experience-fragments/cusa/us/en/site/header/master/_jcr_content/root/header/utility-logo.coreimg.svg/1693941517460/american-made-h-rgb.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
