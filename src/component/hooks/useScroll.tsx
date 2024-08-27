import React, { useEffect, useState } from "react";
import useResponsive from "./useResponsive";
import { SizeOfElement } from "../utils/fs";

const useScroll = () => {
  const [result, setResult] = useState({ top: 0, bottom: 0 });
  const responsive = useResponsive();
  useEffect(() => {
    handleScroll();
    if (!responsive && document.getElementById("children")) {
      document
        .getElementById("children")
        ?.addEventListener("scroll", handleScroll);
      return () =>
        document
          .getElementById("children")
          ?.removeEventListener("scroll", handleScroll);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  }, [responsive]);
  const handleScroll = () => {
    let { elementBottom, htmlHeight, screenHeight } = SizeOfElement(
      document.body
    );

    if (!responsive) {
      const element = document.getElementById("children");
      if (element) {
        let { elementBottom, htmlHeight, screenHeight } =
          SizeOfElement(element);
        setResult({
          top: elementBottom,
          bottom: htmlHeight - screenHeight - elementBottom,
        });
        return true;
      }
    }
    setResult({
      top: elementBottom,
      bottom: htmlHeight - screenHeight - elementBottom,
    });
  };
  return result;
};

export default useScroll;
