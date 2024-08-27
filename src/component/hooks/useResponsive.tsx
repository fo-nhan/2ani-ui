import React from "react";
import useWidth from "./useWidth";

const useResponsive = () => {
  const width = useWidth();
  const [responsive, setResponsive] = React.useState(
    typeof window !== "undefined"
      ? window.innerWidth < 1000
        ? true
        : false
      : false
  );
  React.useEffect(() => {
    if (width && width < 1000) return setResponsive(true);
    return setResponsive(false);
  }, [width]);
  return responsive;
};

export default useResponsive;
