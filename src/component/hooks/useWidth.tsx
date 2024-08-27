import React from "react";

const useWidth = () => {
  const [width, setWidth] = React.useState(
    typeof window !== "undefined" && window.innerWidth
  );

  React.useEffect(() => {
    return window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [typeof window !== "undefined" && window]);

  return width;
};

export default useWidth;
