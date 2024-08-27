import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Tooltip.module.css";
import { renderToString } from "react-dom/server";
import { useRouter } from "next/router";
import useHover from "../../hooks/useHover";
import useScroll from "../../hooks/useScroll";
import { SizeOfElement } from "../../utils/fs";

export type TooltipTypeProps = {
  children: ReactNode;
  content: any;
  width?: Number;
  style?: CSSProperties;
  noReponsive?: boolean;
};

const Tooltip = ({
  children,
  content,
  width,
  style,
  noReponsive = false,
  ...props
}: TooltipTypeProps) => {
  const [classer, setClasser] = useState<any>();
  const ref = useRef<any>();
  const refHover = useRef<any>();
  const hover = useHover(ref);
  const scroll = useScroll();
  const route = useRouter();

  useEffect(() => {
    if (ref.current && hover) {
      const {
        elementLeft,
        elementRight,
        height,
        elementTop,
        elementBottom,
      }: any = SizeOfElement(ref.current);

      setClasser({
        left: elementRight > 100 ? `${elementLeft}px` : "auto",
        right: elementRight > 100 ? `auto` : `${elementRight}px`,
        top: elementBottom > 100 ? `${elementTop + height}px` : "auto",
        bottom: elementBottom > 100 ? "auto" : `${elementBottom + height}px`,
      });
    }
  }, [ref.current, hover, scroll]);

  useEffect(() => {
    let ele: any = document.getElementById("__tooltip");
    let div: any = document.createElement("div");
    if (!ele) {
      return undefined;
    }

    ele.innerHTML = "";

    if (noReponsive && window.innerWidth < 700) {
      ele.innerHTML = "";
    } else {
      if (hover && classer && content) {
        div.style.width = `${width}px`;
        div.style.left = classer.left;
        div.style.right = classer.right;
        div.style.top = classer.top;
        div.style.bottom = classer.bottom;
        div.className = styles["Tooltip-item"];
        div.innerHTML = renderToString(content);
        div.ref = refHover;
        ele.appendChild(div);
      } else {
        ele.innerHTML = "";
      }
    }
  }, [classer, hover, noReponsive, route]);

  return (
    <span
      {...props}
      style={{ ...style }}
      ref={ref}
      className={styles["Tooltip"]}
    >
      {children}
    </span>
  );
};

export default Tooltip;
