import React from "react";
import useWidth from "../../hooks/useWidth";
import Skeleton from "../Skeleton";
import useAniState from "../../hooks/useAniState";

type PositionValue =
  | "auto"
  | 0
  | 2
  | 3
  | 5
  | 7
  | 10
  | 15
  | 20
  | 25
  | 50
  | 75
  | 100
  | 150
  | 200
  | "5%"
  | "10%"
  | "25%"
  | "50%"
  | "75%"
  | "100%"
  | "5vw"
  | "10vw"
  | "25vw"
  | "50vw"
  | "75vw"
  | "100vw";

type CSSProperties = {
  // Layout
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  border?: string;
  "border-radius"?: string;
  "box-shadow"?: string;
  display?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  "z-index"?: number;

  // Background
  background?: string;
  "background-color"?: string;
  "background-image"?: string;
  "background-position"?: string;
  "background-size"?: string;

  // Typography
  color?: string;
  "font-family"?: string;
  "font-size"?: string;
  "font-weight"?: string | number;
  "line-height"?: string;
  "text-align"?: string;
  "text-transform"?: string;
  "letter-spacing"?: string;
  "word-spacing"?: string;

  // Flexbox
  "flex-direction"?: string;
  "flex-wrap"?: string;
  "justify-content"?: string;
  "align-items"?: string;
  "align-self"?: string;
  "align-content"?: string;

  // Grid
  "grid-template-columns"?: string;
  "grid-template-rows"?: string;
  "grid-area"?: string;
  "grid-column"?: string;
  "grid-row"?: string;

  // Transitions and Animations
  transition?: string;
  "transition-property"?: string;
  "transition-duration"?: string;
  "transition-timing-function"?: string;
  animation?: string;
  "animation-name"?: string;
  "animation-duration"?: string;
  "animation-timing-function"?: string;
  "animation-delay"?: string;
  "animation-iteration-count"?: string;

  // Transform
  transform?: string;
  "transform-origin"?: string;

  // Other
  opacity?: string | number;
  overflow?: string;
  visibility?: string;
  cursor?: string;
  "white-space"?: string;
  "word-break"?: string;
  "text-overflow"?: string;
  "overflow-wrap"?: string;
};

type AnimationType = {
  name: string;
  from: CSSProperties; // e.g., "{width: '0%', background: 'red'}"
  to: CSSProperties; // e.g., "{width: '100%', background: 'white'}"
  duration?: string; // e.g., "1s", "500ms"
  timingFunction?:
    | "linear"
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "steps"
    | "cubic-bezier"; // Add cubic-bezier if you need custom timing functions
  delay?: string; // e.g., "0s", "1s"
  iterationCount?: number | "infinite"; // Add number type to allow specific iteration counts
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  fillMode?: "none" | "forwards" | "backwards" | "both";
  playState?: "running" | "paused";
};

type JoinTypeProps = {
  children?: React.ReactNode | string;
  flex?:
    | "flex"
    | "flexEnd"
    | "flexStart"
    | "flexAlign"
    | "flexCenter"
    | "flexColumn"
    | "flexBetween"
    | "flexColumnAlign"
    | "flexColumnBetween"
    | "flexDefault"
    | "flexEndCenter"
    | "flexStartCenter";
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
  fontSize?: 10 | 13 | 14 | 15 | 16 | 18 | 20 | 22 | 25 | 30 | 35 | 50;
  borderRadius?:
    | 4
    | 7
    | 10
    | 15
    | 20
    | 30
    | 45
    | 50
    | 100
    | "25%"
    | "50%"
    | "75%"
    | "100%"
    | "1rem"
    | "2rem"
    | "4rem"
    | "10rem"
    | "25rem";
  width?:
    | 25
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 350
    | 400
    | 500
    | 600
    | 700
    | 1000
    | "10%"
    | "25%"
    | "50%"
    | "75%"
    | "100%"
    | "25vw"
    | "50vw"
    | "75vw"
    | "100vw";
  height?:
    | 20
    | 25
    | 30
    | 35
    | 40
    | 50
    | 60
    | 70
    | 80
    | 90
    | 100
    | 120
    | 150
    | 175
    | 200
    | 250
    | 300
    | 400
    | 500
    | 600
    | 700
    | "25%"
    | "50%"
    | "75%"
    | "100%"
    | "25vh"
    | "50vh"
    | "75vh"
    | "100vh";
  minWidth?:
    | 25
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 350
    | 400
    | 500
    | 600
    | 700
    | 1000
    | "10%"
    | "25%"
    | "50%"
    | "75%"
    | "100%"
    | "25vw"
    | "50vw"
    | "75vw"
    | "100vw";
  minHeight?:
    | 20
    | 25
    | 30
    | 35
    | 40
    | 50
    | 60
    | 70
    | 80
    | 90
    | 100
    | 120
    | 150
    | 175
    | 200
    | 250
    | 300
    | 400
    | 500
    | 600
    | 700
    | "25%"
    | "50%"
    | "75%"
    | "100%"
    | "25vh"
    | "50vh"
    | "75vh"
    | "100vh";
  maxWidth?:
    | 25
    | 50
    | 75
    | 100
    | 125
    | 150
    | 200
    | 250
    | 300
    | 350
    | 400
    | 500
    | 600
    | 700
    | 1000
    | 1200
    | 1400
    | 1600
    | 1800
    | 2000
    | "10%"
    | "25%"
    | "50%"
    | "75%"
    | "100%"
    | "25vw"
    | "50vw"
    | "75vw"
    | "100vw";
  maxHeight?:
    | 20
    | 25
    | 30
    | 35
    | 40
    | 50
    | 60
    | 70
    | 80
    | 90
    | 100
    | 120
    | 150
    | 175
    | 200
    | 250
    | 300
    | 400
    | 500
    | 600
    | 700
    | "25%"
    | "50%"
    | "75%"
    | "100%"
    | "25vh"
    | "50vh"
    | "75vh"
    | "100vh";
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
  position?: "static" | "relative" | "absolute" | "fixed";
  onClick?: (event?: Event) => void;
  onHover?: (hover?: boolean, event?: Event) => void;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  pb?: 5 | 10 | 15 | 20 | 25 | 50;
  pl?: 5 | 10 | 15 | 20 | 25 | 50;
  pr?: 5 | 10 | 15 | 20 | 25 | 50;
  pt?: 5 | 10 | 15 | 20 | 25 | 50;
  mb?: 5 | 10 | 15 | 20 | 25 | 50;
  ml?: 5 | 10 | 15 | 20 | 25 | 50;
  mr?: 5 | 10 | 15 | 20 | 25 | 50;
  mt?: 5 | 10 | 15 | 20 | 25 | 50;
  opacity?:
    | "0%"
    | "10%"
    | "20%"
    | "30%"
    | "40%"
    | "50%"
    | "60%"
    | "70%"
    | "80%"
    | "90%"
    | "100%";
  paddingY?: 5 | 10 | 15 | 20 | 25 | 50 | 100;
  paddingX?: 5 | 10 | 15 | 20 | 25 | 50 | 100;
  noCopy?: boolean;
  customRef?: React.MutableRefObject<any>;
  shadow?: "xs" | "sm" | "md" | "lg";
  textShadow?: "black" | "white" | "primary" | "warning" | "info";
  display?:
    | "block"
    | "inline"
    | "inline-block"
    | "flex"
    | "grid"
    | "inline-flex"
    | "inline-grid"
    | "none"
    | "table"
    | "table-row"
    | "table-cell"
    | "static"
    | "relative"
    | "absolute"
    | "sticky"
    | "fixed";
  top?: PositionValue;
  left?: PositionValue;
  bottom?: PositionValue;
  right?: PositionValue;
  animations?: AnimationType[];
  animation?: "fadeIn" | "slideIn" | "zoomIn" | "rotate" | "bounce" | "pulse";
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  overflowY?: "visible" | "hidden" | "scroll" | "auto";
  overflowX?: "visible" | "hidden" | "scroll" | "auto";
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
  ...props
}: BoxTypeProps) => {
  const [state, setState] = React.useState<JoinTypeProps | null>();
  const [loadingBox, setLoadingBox] = React.useState(true);
  const { theme } = useAniState();
  const useW = useWidth();
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
      state?.noCopy || noCopy ? `UI-2ANI-css-no-copy` : "",
    ].join(" ");
  }, [
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
  ]);

  React.useEffect(() => {
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
  }, [responsive, useW]);

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
      {loadingBox || loading ? (
        <div
          {...{ ...props, ...(style ? { style } : {}) }}
          className={`${classInline} ${animationClasses}`}
        >
          <Skeleton />
        </div>
      ) : (
        <div
          {...{ ...props, ...(style ? { style } : {}) }}
          onMouseEnter={(e: any) => onHover?.(true, e)}
          onMouseLeave={(e: any) => onHover?.(false, e)}
          onClick={(e: any) => onClick?.(e)}
          className={`${classInline} ${animationClasses}`}
          ref={customRef}
        >
          {children || ""}
        </div>
      )}
    </>
  );
};

export default Box;
