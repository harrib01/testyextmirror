import { useEffect } from "react";

const useAdobeLaunchScript = () => {
  useEffect(() => {
    const isProd = window.location.hostname === "www.cambriausa.com" ? true : false;
    
    const script = document.createElement("script");
    script.src = isProd
      ? "https://assets.adobedtm.com/1402610a9628/0153fce5901c/launch-9ee8dfdc8b34.min.js"
      : "https://assets.adobedtm.com/1402610a9628/0153fce5901c/launch-fef93f29cda4-staging.min.js";
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
};

export default useAdobeLaunchScript;
