import React from "react";

type TypeProps = {
  key: "justTouched" | "surfing" | "cancelTouch" | "unTouch";
  data?: any;
};

const useTouch = (refs: React.MutableRefObject<any>) => {
  const [result, setResult] = React.useState<TypeProps | null>(null);
  const touchStart = (e: any) => {
    setResult({
      key: "justTouched",
      data: e.touches[0],
    });
  };
  const touchEnd = (e: any) => {
    setResult({
      key: "surfing",
      data: e.touches[0],
    });
  };
  const touchCancel = (e: any) => {
    setResult({
      key: "cancelTouch",
      data: e.touches[0],
    });
  };
  const touchMove = (e: any) => {
    setResult({
      key: "unTouch",
      data: e.touches[0],
    });
  };

  React.useEffect(() => {
    if (refs && refs.current) {
      refs.current.addEventListener("touchstart", touchStart);
      refs.current.addEventListener("touchend", touchEnd);
      refs.current.addEventListener("touchcancel", touchCancel);
      refs.current.addEventListener("touchmove", touchMove);
    }
  }, [refs]);

  return result;
};

export default useTouch;
