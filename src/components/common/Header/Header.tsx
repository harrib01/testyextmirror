import React, { useState } from "react";
import type { CTA, Image as ImageType } from "@yext/types";
import { useBreakpoint } from "src/common/useBreakpoints";
import "src/components/common/Header/Header.css";
import NavigationBar from "./NavigationBar/NavigationBar";
import UtilityBar from "./UtilityBar/UtilityBar";

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
        <div></div>
      )}
    </header>
  );
};

export default Header;
