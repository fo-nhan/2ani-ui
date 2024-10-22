import React from "react";

type SwipeDirection = "left" | "right" | "up" | "down" | null;
type TypeProps = {
  key: "start" | "cancel" | "move" | "swipe";
  data?: any;
  direction?: SwipeDirection;
};

const useTouch = (refs: React.MutableRefObject<any>) => {
  const [result, setResult] = React.useState<TypeProps | null>(null);
  const [startX, setStartX] = React.useState<number | null>(null);
  const [startY, setStartY] = React.useState<number | null>(null);

  const touchStart = (e: any) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
    setResult({
      key: "start",
      data: touch,
    });
  };

  const touchEnd = (e: any) => {
    const touch = e.changedTouches[0];
    if (startX !== null && startY !== null) {
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      let direction: SwipeDirection = null;

      // Xác định hướng vuốt
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 15) {
          direction = "left";
        } else if (deltaX < -15) {
          direction = "right";
        }
      } else {
        if (deltaY > 15) {
          direction = "down";
        } else if (deltaY < -15) {
          direction = "up";
        }
      }

      setResult({
        key: "swipe",
        data: touch,
        direction: direction,
      });
    }
    setStartX(null);
    setStartY(null);
  };

  const touchCancel = (e: any) => {
    setResult({
      key: "cancel",
      data: e.touches[0],
    });
  };

  const touchMove = (e: any) => {
    setResult({
      key: "move",
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

    return () => {
      if (refs && refs.current) {
        refs.current.removeEventListener("touchstart", touchStart);
        refs.current.removeEventListener("touchend", touchEnd);
        refs.current.removeEventListener("touchcancel", touchCancel);
        refs.current.removeEventListener("touchmove", touchMove);
      }
    };
  }, [refs, startX, startY]);

  return result;
};

export default useTouch;
