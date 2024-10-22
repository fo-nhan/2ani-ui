import React from "react";
import Skeleton from "../Skeleton";
import useAniState from "../../hooks/useAniState";
import { TypeColorProps } from "../../type";
import {
  AnimationType,
  BorderRadiusType,
  BorderStyle,
  BorderWidth,
  CSSProperties,
  DisplayType,
  FlexType,
  FontSizeType,
  LightHeightType,
  OpacityType,
  OverflowType,
  PositionValue,
  RangeType,
  ShadowType,
  SizeHType,
  SizeMaxHType,
  SizeMaxWType,
  SizeMinHType,
  SizeMinWType,
  SizeWType,
  ZIndexType,
} from "./type";

type JoinTypeProps = {
  children?: React.ReactNode | string;
  flex?: FlexType;
  justify?:
    | "flexStart"
    | "flexEnd"
    | "center"
    | "spaceBetween"
    | "spaceAround"
    | "spaceEvenly";
  align?: "center" | "start" | "end" | "auto";
  cursor?:
    | "copy"
    | "auto"
    | "default"
    | "move"
    | "no-drop"
    | "text"
    | "pointer";
  fontSize?: FontSizeType;
  borderRadius?: BorderRadiusType;
  width?: SizeWType;
  height?: SizeHType;
  minWidth?: SizeMinWType;

  minHeight?: SizeMinHType;

  maxWidth?: SizeMaxWType;

  maxHeight?: SizeMaxHType;

  background?:
    | "primary"
    | "secondary"
    | "info"
    | "warning"
    | "violet"
    | "sunny"
    | "pink"
    | "default"
    | "black"
    | "white"
    | "auto"
    | "none";
  backgroundHover?:
    | "primary"
    | "secondary"
    | "info"
    | "warning"
    | "violet"
    | "sunny"
    | "pink"
    | "default"
    | "black"
    | "white"
    | "grey";
  backgroundGradient?:
    | "green"
    | "violet"
    | "blue"
    | "tomato"
    | "yellow"
    | "orange";
  textGradient?: "green" | "violet" | "blue" | "tomato" | "yellow" | "orange";
  gap?: 5 | 7 | 10 | 15 | 20 | 25 | 50 | 75 | 100;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  onClick?: (
    event?: Event,
    setState?: React.Dispatch<
      React.SetStateAction<JoinTypeProps | null | undefined>
    >
  ) => void;
  onHover?: (
    hover?: boolean,
    event?: Event,
    setState?: React.Dispatch<
      React.SetStateAction<JoinTypeProps | null | undefined>
    >
  ) => void;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  pb?: RangeType;
  pl?: RangeType;
  pr?: RangeType;
  pt?: RangeType;
  mb?: RangeType;
  ml?: RangeType;
  mr?: RangeType;
  mt?: RangeType;
  opacity?: OpacityType;

  paddingY?: RangeType;
  paddingX?: RangeType;
  noCopy?: boolean;
  customRef?: React.MutableRefObject<any>;
  shadow?: "xs" | "sm" | "md" | "lg" | ShadowType | "none";
  textShadow?: "black" | "white" | "primary" | "warning" | "info";
  display?: DisplayType;

  top?: PositionValue;
  left?: PositionValue;
  bottom?: PositionValue;
  right?: PositionValue;
  animations?: AnimationType[];
  animation?: "fadeIn" | "slideIn" | "zoomIn" | "rotate" | "bounce" | "pulse";
  overflow?: OverflowType;
  overflowY?: OverflowType;
  overflowX?: OverflowType;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  backgroundSize?: "auto" | "cover" | "contain";
  zIndex?: ZIndexType;
  textColor?: TypeColorProps | "auto";
  textHover?: boolean;
  lightHeight?: LightHeightType;
  skeletonLaze?: boolean;
  borderTopWidth?: BorderWidth;
  borderRightWidth?: BorderWidth;
  borderBottomWidth?: BorderWidth;
  borderLeftWidth?: BorderWidth;
  borderColor?: TypeColorProps;
  borderStyle?: BorderStyle;
  border?: boolean;
};

export type BoxTypeProps = JoinTypeProps & {
  responsive?: {
    maxMedia?: number;
    minMedia?: number;
    style: JoinTypeProps;
  }[];
  [key: string | number | symbol]: any;
};

const animationCache: any = {};

const cssObjectToString = (cssObject: CSSProperties) => {
  return Object.entries(cssObject)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
};

const Box = ({
  children,
  responsive,
  align,
  cursor = "auto",
  flex,
  borderRadius,
  fontSize,
  height,
  width,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  background,
  backgroundGradient,
  backgroundHover,
  gap,
  position,
  onClick = () => {},
  onHover = () => {},
  loading,
  className = "",
  style,
  mb,
  ml,
  mr,
  mt,
  pb,
  pl,
  pr,
  pt,
  opacity,
  paddingX,
  paddingY,
  noCopy = false,
  customRef,
  shadow,
  textShadow,
  textGradient,
  justify,
  display,
  top,
  left,
  right,
  bottom,
  animations,
  animation,
  overflow,
  overflowX,
  overflowY,
  objectFit,
  backgroundSize,
  zIndex,
  textColor,
  textHover,
  lightHeight,
  skeletonLaze,
  border,
  borderBottomWidth,
  borderColor,
  borderLeftWidth,
  borderRightWidth,
  borderStyle,
  borderTopWidth,

  ...props
}: BoxTypeProps) => {
  const [state, setState] = React.useState<JoinTypeProps | null>();
  const [loadingBox, setLoadingBox] = React.useState(true);
  const { theme } = useAniState();
  const [responsiveLoading, setResponsiveLoading] = React.useState(
    responsive ? true : false
  );

  const classInline = React.useMemo(() => {
    return [
      (state?.flex || flex ? `UI-2ANI-BOX-${state?.flex || flex}` : "") || "",
      `UI-2ANI-BOX-cursor-${state?.cursor || cursor}`,
      state?.align || align ? `UI-2ANI-BOX-align-${state?.align || align}` : "",
      state?.fontSize || fontSize
        ? `UI-2ANI-BOX-fontSize-${state?.fontSize || fontSize}`
        : "",
      state?.paddingX || paddingX
        ? `UI-2ANI-BOX-paddingX-${state?.paddingX || paddingX}`
        : "",
      state?.paddingY || paddingY
        ? `UI-2ANI-BOX-paddingY-${state?.paddingY || paddingY}`
        : "",

      state?.borderRadius || borderRadius
        ? `UI-2ANI-BOX-borderRadius-${state?.borderRadius || borderRadius}`
        : "",
      state?.position || position
        ? `UI-2ANI-BOX-position-${state?.position || position}`
        : "",
      state?.height || height
        ? `UI-2ANI-BOX-height-${state?.height || height}`
        : "",
      state?.opacity || opacity
        ? `UI-2ANI-BOX-opacity-${state?.opacity || opacity}`
        : "",
      state?.width || width ? `UI-2ANI-BOX-width-${state?.width || width}` : "",
      state?.gap || gap ? `UI-2ANI-BOX-gap-${state?.gap || gap}` : "",

      state?.minWidth || minWidth
        ? `UI-2ANI-BOX-minWidth-${state?.minWidth || minWidth}`
        : "",

      state?.minHeight || minHeight
        ? `UI-2ANI-BOX-minHeight-${state?.minHeight || minHeight}`
        : "",

      state?.maxHeight || maxHeight
        ? `UI-2ANI-BOX-maxHeight-${state?.maxHeight || maxHeight}`
        : "",
      state?.maxWidth || maxWidth
        ? `UI-2ANI-BOX-maxWidth-${state?.maxWidth || maxWidth}`
        : "",
      state?.background || background
        ? state?.background === "auto" || background === "auto"
          ? theme?.backgroundColorClass || ""
          : `UI-2ANI-${state?.background || background}`
        : "",
      state?.backgroundHover || backgroundHover
        ? `UI-2ANI-${state?.backgroundHover || backgroundHover}-hover`
        : "",

      state?.backgroundGradient || backgroundGradient
        ? `UI-2ANI-${state?.backgroundGradient || backgroundGradient}-gradient`
        : "",
      state?.textGradient || textGradient
        ? `UI-2ANI-text-${state?.textGradient || textGradient}-gradient`
        : "",
      state?.className || className || "",
      state?.pl || pl ? `UI-2ANI-BOX-padding-left-${state?.pl || pl}` : "",
      state?.pr || pr ? `UI-2ANI-BOX-padding-right-${state?.pr || pr}` : "",
      state?.pb || pb ? `UI-2ANI-BOX-padding-bottom-${state?.pb || pb}` : "",
      state?.pt || pt ? `UI-2ANI-BOX-padding-top-${state?.pt || pt}` : "",
      state?.ml || ml ? `UI-2ANI-BOX-margin-left-${state?.ml || ml}` : "",
      state?.mr || mr ? `UI-2ANI-BOX-margin-right-${state?.mr || mr}` : "",
      state?.mb || mb ? `UI-2ANI-BOX-margin-bottom-${state?.mb || mb}` : "",
      state?.mt || mt ? `UI-2ANI-BOX-margin-top-${state?.mt || mt}` : "",
      state?.shadow || shadow
        ? `UI-2ANI-BOX-shadow-${state?.shadow || shadow}`
        : "",
      state?.textShadow || textShadow
        ? `UI-2ANI-BOX-textShadow-${state?.textShadow || textShadow}`
        : "",
      state?.justify || justify
        ? `UI-2ANI-BOX-justify-${state?.justify || justify}`
        : "",
      state?.display || display
        ? `UI-2ANI-BOX-display-${state?.display || display}`
        : "",
      state?.left || left ? `UI-2ANI-BOX-left-${state?.left || left}` : "",
      state?.right || right ? `UI-2ANI-BOX-right-${state?.right || right}` : "",
      state?.top || top ? `UI-2ANI-BOX-top-${state?.top || top}` : "",
      state?.bottom || bottom
        ? `UI-2ANI-BOX-bottom-${state?.bottom || bottom}`
        : "",
      state?.animation || animation
        ? `UI-2ANI-BOX-animation-default-${state?.animation || animation}`
        : "",
      state?.overflow || overflow
        ? `UI-2ANI-BOX-overflow-${state?.overflow || overflow}`
        : "",
      state?.overflowX || overflowX
        ? `UI-2ANI-BOX-overflowX-${state?.overflowX || overflowX}`
        : "",
      state?.overflowY || overflowY
        ? `UI-2ANI-BOX-overflowY-${state?.overflowY || overflowY}`
        : "",
      state?.objectFit || objectFit
        ? `UI-2ANI-BOX-objectFit-${state?.objectFit || objectFit}`
        : "",
      state?.backgroundSize || backgroundSize
        ? `UI-2ANI-BOX-backgroundSize-${state?.backgroundSize || backgroundSize}`
        : "",
      state?.zIndex || zIndex
        ? `UI-2ANI-BOX-zIndex-${state?.zIndex || zIndex}`
        : "",
      state?.lightHeight || lightHeight
        ? `UI-2ANI-BOX-lightHeight-${state?.lightHeight || lightHeight}`
        : "",
      state?.textColor || textColor
        ? `UI-2ANI-text-${state?.textColor || textColor}`
        : "",
      (state?.textHover || textHover) && (state?.textColor || textColor)
        ? `UI-2ANI-text-${state?.textColor || textColor}${state?.textHover || textHover ? "-hover" : ""}`
        : "",
      state?.noCopy || noCopy ? `UI-2ANI-css-no-copy` : "",
      state?.border || border ? `UI-2ANI-border` : "",
      state?.borderColor || borderColor
        ? `UI-2ANI-border-color-${state?.borderColor || borderColor}`
        : "",
      state?.borderStyle || borderStyle
        ? `UI-2ANI-border-style-${state?.borderStyle || borderStyle}`
        : "",
      state?.borderLeftWidth || borderLeftWidth
        ? `UI-2ANI-border-left-width-${state?.borderLeftWidth || borderLeftWidth}`
        : "",
      state?.borderRightWidth || borderRightWidth
        ? `UI-2ANI-border-right-width-${state?.borderRightWidth || borderRightWidth}`
        : "",
      state?.borderTopWidth || borderTopWidth
        ? `UI-2ANI-border-top-width-${state?.borderTopWidth || borderTopWidth}`
        : "",
      state?.borderBottomWidth || borderBottomWidth
        ? `UI-2ANI-border-bottom-width-${state?.borderBottomWidth || borderBottomWidth}`
        : "",
    ].join(" ");
  }, [
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
    borderBottomWidth,
    borderStyle,
    borderColor,
    border,
    state,
    align,
    cursor,
    flex,
    borderRadius,
    height,
    width,
    fontSize,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    theme,
    background,
    backgroundGradient,
    backgroundHover,
    gap,
    position,
    className,
    mb,
    ml,
    mr,
    mt,
    pb,
    pl,
    pr,
    pt,
    paddingX,
    paddingY,
    noCopy,
    opacity,
    shadow,
    textShadow,
    textGradient,
    justify,
    display,
    top,
    left,
    right,
    bottom,
    animation,
    overflow,
    overflowX,
    overflowY,
    objectFit,
    backgroundSize,
    zIndex,
    textColor,
    textColor,
    lightHeight,
  ]);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width && responsive && responsive?.length) {
        let change: any = {};
        for (let index = 0; index < responsive.length; index++) {
          const element = responsive[index];
          const max = element.maxMedia || 9999;
          const min = element.minMedia || 0;

          if (width >= min && width <= max) {
            change = element.style;
          }
        }
        setState(change);
      }
      setLoadingBox(false);
      setResponsiveLoading(false);
    };

    window.addEventListener("resize", handleResize);

    // Gọi handleResize một lần khi component mount
    handleResize();

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [responsive]);

  const styleSheetRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (animations || state?.animations) {
      const animationState: AnimationType[] | undefined =
        state?.animations || animations;
      if (animationState) {
        if (!styleSheetRef.current) {
          const styleSheet = document.createElement("style");
          styleSheet.id = "UI-2ANI-BOX-dynamic-animation-styles";
          document.head.appendChild(styleSheet);
          styleSheetRef.current = styleSheet;
        }

        const styleSheet = styleSheetRef.current.sheet;
        const usedClasses = new Set();

        animationState.forEach((animate: AnimationType) => {
          const className = `UI-2ANI-BOX-gere-animate-${animate.name}`;

          if (!animationCache[className]) {
            const animationKeyframes = `
                                        @keyframes ${className} {
                                          from { ${cssObjectToString(animate.from)} }
                                          to { ${cssObjectToString(animate.to)} }
                                        }
                                      `;

            const cssString = `
                                .${className} {
                                  animation-name: ${className};
                                  animation-duration: ${animate.duration || "1s"};
                                  animation-timing-function: ${animate.timingFunction || "ease"};
                                  animation-delay: ${animate.delay || "0s"};
                                  animation-iteration-count: ${animate.iterationCount || "1"};
                                  animation-direction: ${animate.direction || "normal"};
                                  animation-fill-mode: ${animate.fillMode || "none"};
                                  animation-play-state: ${animate.playState || "running"};
                                }
                              `;

            animationCache[className] = true;
            styleSheet.insertRule(
              `${animationKeyframes}`,
              styleSheet.cssRules.length
            );
            styleSheet.insertRule(`${cssString}`, styleSheet.cssRules.length);
          }

          usedClasses.add(className);
        });

        return () => {
          // Dọn dẹp các class không còn sử dụng
          for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
            const rule = styleSheet.cssRules[i];
            if (
              rule instanceof CSSKeyframesRule ||
              rule instanceof CSSStyleRule
            ) {
              const className =
                (rule as any).name ||
                (rule as any).selectorText.replace(".", "");
              if (!usedClasses.has(className)) {
                styleSheet.deleteRule(i);
              }
            }
          }
        };
      }
    }
  }, [animations, state?.animations]);

  const animationClasses = React.useMemo(() => {
    const animationState: AnimationType[] | undefined =
      state?.animations || animations;
    if (animationState) {
      return animationState
        .map(({ name }) => `UI-2ANI-BOX-gere-animate-${name}`)
        .join(" ");
    }
    return "";
  }, [animations, state?.animations]);

  return (
    <>
      {!responsiveLoading && (
        <>
          {loadingBox || loading ? (
            <div
              {...{ ...props, ...(style ? { style } : {}) }}
              className={`${classInline} ${animationClasses}`}
            >
              {skeletonLaze ? <Skeleton /> : ""}
            </div>
          ) : (
            <div
              {...{ ...props, ...(style ? { style } : {}) }}
              onMouseEnter={(e: any) => onHover?.(true, e, setState)}
              onMouseLeave={(e: any) => onHover?.(false, e, setState)}
              onClick={(e: any) => onClick?.(e, setState)}
              className={`${classInline} ${animationClasses}`}
              ref={customRef}
            >
              {children || ""}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Box;
