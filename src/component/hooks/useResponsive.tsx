import React from "react";
import { useRouter } from "next/router";
import useWidth from "./useWidth";

const useResponsive = () => {
  const width = useWidth();
  const router = useRouter()
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
  }, [width, router]);
  return responsive;
};

export default useResponsive;
