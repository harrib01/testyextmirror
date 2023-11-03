import React from "react";
import { useBreakpoint } from "src/common/useBreakpoints";
import "src/components/common/Header/Header.css";
import NavigationBar from "./NavigationBar/Desktop/DesktopNavigationBar";
import UtilityBar from "./UtilityBar/UtilityBar";
import MobileNavigationBar from "./NavigationBar/Mobile/MobileNavigationBar";

const Header = () => {
  const isDesktopBreakpoint = useBreakpoint("lg");

  return (
    <header className="Header relative">
      {isDesktopBreakpoint ? (
        <>
          <UtilityBar />
          <NavigationBar />
        </>
      ) : (
        <MobileNavigationBar />
      )}
    </header>
  );
};

export default Header;
