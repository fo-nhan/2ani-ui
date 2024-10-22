import React from "react";
import styles from "./Slide.module.css";
import { SizeOfElement } from "../../utils/fs";
import Skeleton from "../Skeleton";
import Icon from "../../Icon";
import useAniState from "../../hooks/useAniState";
import useTouch from "../../hooks/useTouch";

export type SlideTypeProps = {
  data: any[];
  render: (value: any, index: number) => React.ReactNode;
  loading?: boolean;
  lazy?: number;
  lazyRender?: React.ReactNode;
  width?: number;
  height?: number;
  className?: string;
  classNameItem?: string;
  lastElement?: React.ReactNode;
  firstElement?: React.ReactNode;
  showButton?: boolean;
  dotButton?: boolean;
  reSize?: number;
  boxShadow?: boolean;
  startEndPadding?: boolean;
  infinite?: boolean;
  start?: number;
};

const Slide = ({
  data = [],
  render = () => <></>,
  loading = false,
  lazy = 0,
  lazyRender,
  height = 0,
  width = 0,
  className = "",
  classNameItem = "",
  lastElement,
  firstElement,
  showButton = false,
  dotButton = false,
  reSize = 0.8,
  boxShadow = false,
  startEndPadding = false,
  infinite = false,
  start = 0,
}: SlideTypeProps) => {
  const [init, setInit] = React.useState({
    current: start,
    init: 0,
  });
  const { theme } = useAniState();
  const ref = React.useRef<any>();

  const touch = useTouch(ref);
  const styleItem = React.useMemo(() => {
    let stl: any = {};
    if (width) stl.width = width;
    if (height) stl.height = height;
    return stl;
  }, [width, height]);

  React.useEffect(() => {
    // Move box
    if (ref.current) {
      let mouseDownBox = false;
      let startXBox: any, scrollLeftBox: any;
      //   let startYBox: any, scrollRightBox: any;
      const sliderBox: any = ref.current;

      const startDraggingBox = (e: any) => {
        e.preventDefault();
        mouseDownBox = true;
        startXBox = e.pageX - sliderBox.offsetLeft;
        scrollLeftBox = sliderBox.scrollLeft;

        // startYBox = e.pageY - sliderBox.offsetTop;
        // scrollRightBox = sliderBox.scrollTop;
      };

      const stopDraggingBox = (e: any) => {
        e.preventDefault();
        mouseDownBox = false;

        if (infinite) {
          const x = e.pageX - sliderBox.offsetLeft;
          const scroll = x - startXBox;
          const { width } = SizeOfElement(sliderBox);
          const newWidth = Math.round(width * reSize + 10);
          if (scrollLeftBox - scroll + newWidth > sliderBox.scrollWidth) {
            sliderBox.scrollTo({
              top: 0,
              left: 1,
              behavior: "smooth",
            });
            sliderBox.scrollLeft = 1;
          } else if (scrollLeftBox - scroll < 0) {
            sliderBox.scrollTo({
              top: 0,
              left: scroll,
              behavior: "smooth",
            });
            sliderBox.scrollLeft = sliderBox.scrollWidth;
          }
        }
      };

      const moveBox = (e: any) => {
        e.preventDefault();
        if (!mouseDownBox) {
          return;
        }

        const x = e.pageX - sliderBox.offsetLeft;
        const scroll = x - startXBox;

        sliderBox.scrollLeft = scrollLeftBox - scroll;

        // const y = e.pageY - sliderBox.offsetTop;
        // const scrollY = y - startYBox;
        // sliderBox.scrollTop = scrollRightBox - scrollY;
      };

      // Add the event listeners
      sliderBox.addEventListener("mousemove", moveBox, false);
      sliderBox.addEventListener("mousedown", startDraggingBox, false);
      sliderBox.addEventListener(
        "mouseup",
        (e: any) => {
          stopDraggingBox(e);
          const { scrollWidth, width, scrollLeft } = SizeOfElement(sliderBox);
          const newWidth = Math.round(width * reSize + 10);
          const maxStep = Math.ceil(scrollWidth / newWidth);
          const initStep = Math.ceil(scrollLeft / newWidth);
          let scroll = 0;
          if (scrollLeft >= scrollLeftBox) {
            scroll = (initStep >= maxStep ? maxStep : initStep) * newWidth;
            setInit({
              current: initStep,
              init: Math.ceil(scrollWidth / newWidth),
            });
          } else {
            scroll = (initStep - 1) * newWidth;
            setInit({
              current: initStep - 1,
              init: Math.ceil(scrollWidth / newWidth),
            });
          }

          sliderBox.scrollTo({
            top: 0,
            left: scroll,
            behavior: "smooth",
          });
        },
        false
      );
      sliderBox.addEventListener("mouseleave", stopDraggingBox, false);

      const { scrollWidth, width } = SizeOfElement(sliderBox);
      const newWidth = Math.round(width * reSize + 10);
      if (start !== 0) {
        sliderBox.scrollLeft = (start - 1) * newWidth;
        setInit({
          current: start - 1,
          init: Math.ceil(scrollWidth / newWidth),
        });
      } else {
        setInit({
          current: 0,
          init: Math.ceil(scrollWidth / newWidth),
        });
      }
    }
  }, [ref, reSize, infinite, start]);

  React.useEffect(() => {
    if (
      touch &&
      touch.key === "swipe" &&
      touch.direction &&
      touch.direction === "right"
    ) {
      if (init.current + 1 < init.init) {
        const sliderBox: any = ref.current;
        const { width } = SizeOfElement(sliderBox);
        const newWidth = Math.round(width * reSize + 10);

        sliderBox.scrollTo({
          top: 0,
          left: ((init.current || 0) + 1) * newWidth,
          behavior: "smooth",
        });

        setInit({
          ...init,
          current: (init.current || 0) + 1,
        });
      }
    }

    if (
      touch &&
      touch.key === "swipe" &&
      touch.direction &&
      touch.direction === "left"
    ) {
      if (init.current > 0) {
        const sliderBox: any = ref.current;
        const { width } = SizeOfElement(sliderBox);
        const newWidth = Math.round(width * reSize + 10);

        sliderBox.scrollTo({
          top: 0,
          left: (init.current - 1) * newWidth,
          behavior: "smooth",
        });

        setInit({
          ...init,
          current: init.current - 1,
        });
      }
    }
  }, [touch]);

  const onNext = (e: any) => {
    e.preventDefault();
    if (init.current + 1 < init.init) {
      const sliderBox: any = ref.current;
      const { width } = SizeOfElement(sliderBox);
      const newWidth = Math.round(width * reSize + 10);

      sliderBox.scrollTo({
        top: 0,
        left: ((init.current || 0) + 1) * newWidth,
        behavior: "smooth",
      });

      setInit({
        ...init,
        current: (init.current || 0) + 1,
      });
    }
  };

  const onPrev = (e: any) => {
    e.preventDefault();
    if (init.current > 0) {
      const sliderBox: any = ref.current;
      const { width } = SizeOfElement(sliderBox);
      const newWidth = Math.round(width * reSize + 10);

      sliderBox.scrollTo({
        top: 0,
        left: (init.current - 1) * newWidth,
        behavior: "smooth",
      });

      setInit({
        ...init,
        current: init.current - 1,
      });
    }
  };

  const onChangeDot = (i: number) => {
    const sliderBox: any = ref.current;
    const { width }: any = SizeOfElement(sliderBox);
    const newWidth = Math.round(width * reSize + 10);

    sliderBox.scrollTo({
      top: 0,
      left: i * newWidth,
      behavior: "smooth",
    });

    setInit({
      ...init,
      current: i,
    });
  };

  return (
    <div className={`${styles.container} ${dotButton && styles.flex}`}>
      <div ref={ref} className={`${styles.content} ${className}`}>
        {firstElement && !loading ? (
          <div
            style={styleItem}
            className={`${styles.item} ${boxShadow ? styles.itemBoxshadow : ""} ${startEndPadding ? styles.startEndPadding : ""} ${classNameItem}`}
          >
            {firstElement}
          </div>
        ) : (
          ""
        )}
        {!!data?.length &&
          data.map((value: any, index: number) => (
            <div
              style={styleItem}
              className={`${styles.item} ${boxShadow ? styles.itemBoxshadow : ""} ${startEndPadding ? styles.startEndPadding : ""} ${classNameItem}`}
              key={index}
            >
              {render(value, index)}
            </div>
          ))}
        {lastElement && !loading ? (
          <div
            style={styleItem}
            className={`${styles.item} ${boxShadow ? styles.itemBoxshadow : ""} ${startEndPadding ? styles.startEndPadding : ""} ${classNameItem}`}
          >
            {lastElement}
          </div>
        ) : (
          ""
        )}
        {loading &&
          Array(lazy)
            .fill("")
            .map((value: any, index: number) => (
              <React.Fragment key={value + index}>
                {lazyRender || (
                  <Skeleton
                    style={{ height: "auto", ...styleItem, display: "block" }}
                    className={`${styles.item} ${boxShadow ? styles.itemBoxshadow : ""} ${classNameItem}`}
                  />
                )}
              </React.Fragment>
            ))}
      </div>
      {showButton && (
        <>
          {!!(init.current > 0) && (
            <div
              onClick={onPrev}
              className={`${styles.prev} ${theme?.backgroundColorClass || ""}`}
            >
              <Icon type="arrow-left" />
            </div>
          )}
          {!!(init.current + 1 < init.init) && (
            <div
              onClick={onNext}
              className={`${styles.next} ${theme?.backgroundColorClass || ""}`}
            >
              <Icon type="arrow-right" />
            </div>
          )}
        </>
      )}
      {dotButton && (
        <div className={styles.dot}>
          {Array(init.init)
            .fill("")
            .map((val, index) => (
              <div
                className={`${styles.dotItem} ${
                  init.current === index ? styles.dotChecked : ""
                }`}
                onClick={() => onChangeDot(index)}
                key={val + index}
              ></div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Slide;
