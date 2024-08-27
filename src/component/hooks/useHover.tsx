import React from "react";

const useHover = (ref: React.MutableRefObject<any>) => {
  const [isHovered, setIsHovered] = React.useState(false);
  React.useEffect(() => {
    if (ref) {
      if (ref.current) {
        ref.current.onmouseenter = () => setIsHovered(true);
        ref.current.onmouseleave = () => setIsHovered(false);
      }
    }
  }, [ref]);
  return isHovered;
};

export default useHover;
