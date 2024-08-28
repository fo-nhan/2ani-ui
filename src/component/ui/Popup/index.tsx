import React from "react";
import styles from "./Popup.module.css";
import { SizeOfElement } from "../../utils/fs";
import Box, { BoxTypeProps } from "../Box";
import useAniState from "../../hooks/useAniState";
import useScroll from "../../hooks/useScroll";
import useDetectElement from "../../hooks/useDetectElement";

export type PopupTypeProps = {
  children: React.ReactNode;
  propsChildren?: BoxTypeProps;
  propsParent?: BoxTypeProps;
  content?: React.ReactNode | string;
  type?: "hover" | "click";
};

const Popup = ({
  children,
  content,
  propsChildren = {},
  propsParent = {},
  type = "hover",
}: PopupTypeProps) => {
  const ref = React.useRef<any>();
  const [open, setOpen] = React.useState(false);
  const { theme } = useAniState();
  const scroll = useScroll();
  const detect = useDetectElement(ref);
  const [sizeObject, setSizeObject] = React.useState<{
    top: string | number;
    left: string | number;
    right: string | number;
    bottom: string | number;
  }>({
    top: 0,
    left: 0,
    right: 0,
    bottom: "auto",
  });

  const onHandleHover = (value: boolean | undefined) => {
    if (type === "hover") {
      if (value && ref.current) {
        const elementSize = SizeOfElement(ref.current);
        if (elementSize) {
          const getStyles = {
            top:
              elementSize.elementBottom > elementSize.elementTop
                ? elementSize.height + elementSize.elementTop + "px"
                : "auto",
            bottom:
              elementSize.elementBottom > elementSize.elementTop
                ? "auto"
                : elementSize.height + elementSize.elementBottom + "px",
            left:
              elementSize.elementRight > elementSize.elementLeft
                ? elementSize.elementLeft + "px"
                : "auto",
            right:
              elementSize.elementRight > elementSize.elementLeft
                ? "auto"
                : elementSize.elementRight + "px",
          };

          setSizeObject(getStyles);
        }
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  };

  const onHandleClick = () => {
    if (type === "click" && ref.current) {
      const elementSize = SizeOfElement(ref.current);
      if (elementSize) {
        const getStyles = {
          top:
            elementSize.elementBottom > elementSize.elementTop
              ? elementSize.height + elementSize.elementTop + "px"
              : "auto",
          bottom:
            elementSize.elementBottom > elementSize.elementTop
              ? "auto"
              : elementSize.height + elementSize.elementBottom + "px",
          left:
            elementSize.elementRight > elementSize.elementLeft
              ? elementSize.elementLeft + "px"
              : "auto",
          right:
            elementSize.elementRight > elementSize.elementLeft
              ? "auto"
              : elementSize.elementRight + "px",
        };

        setSizeObject(getStyles);
      }
      setOpen(true);
    }
  };

  React.useEffect(() => {
    if (open && ref.current) {
      const elementSize = SizeOfElement(ref.current);
      const getStyles = {
        top:
          elementSize.elementBottom > elementSize.elementTop
            ? elementSize.height + elementSize.elementTop + "px"
            : "auto",
        bottom:
          elementSize.elementBottom > elementSize.elementTop
            ? "auto"
            : elementSize.height + elementSize.elementBottom + "px",
        left:
          elementSize.elementRight > elementSize.elementLeft
            ? elementSize.elementLeft + "px"
            : "auto",
        right:
          elementSize.elementRight > elementSize.elementLeft
            ? "auto"
            : elementSize.elementRight + "px",
      };

      setSizeObject(getStyles);
    }
  }, [scroll]);

  React.useEffect(() => {
    if (!detect) {
      setOpen(false);
    }
  }, [detect]);
  return (
    <Box
      {...propsParent}
      onHover={(value) => onHandleHover(value)}
      onClick={() => onHandleClick()}
      className={`${styles.container} ${propsParent?.className || ""}`}
      customRef={ref}
    >
      {children}
      <Box
        {...propsChildren}
        style={{
          ...(propsChildren?.style ? propsChildren.style : {}),
          left: sizeObject.left,
          right: sizeObject.right,
          bottom: sizeObject.bottom,
          top: sizeObject.top,
        }}
        className={`${styles.content} ${open ? styles.open : styles.close} ${theme.backgroundColorClass || ""}  ${propsChildren?.className || ""}`}
      >
        {content}
      </Box>
    </Box>
  );
};

export default Popup;
