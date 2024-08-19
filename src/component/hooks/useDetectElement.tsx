import React, { useEffect, useState } from "react";

const useDetectElement = (ref: React.MutableRefObject<any>) => {
  /**
   * outside = true tương ứng với việc người dùng đang click trong màn hình
   * false tương ứng với ngoài màn hình
   */
  const [outside, setOutside] = useState(true);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOutside(false);
      } else {
        setOutside(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return outside;
};

export default useDetectElement;
