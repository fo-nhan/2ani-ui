import React from "react";
import useWidth from "../../hooks/useWidth";
import Skeleton from "../Skeleton";
import useAniState from "../../hooks/useAniState";

type JoinTypeProps = {
  children?: React.ReactNode | string;
  flex?:
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
  align?: "center" | "start" | "end";
  cursor?:
    | "copy"
    | "auto"
    | "default"
    | "move"
    | "no-drop"
    | "text"
    | "pointer";
  fontSize?: 10 | 13 | 14 | 15 | 16 | 18 | 20 | 22 | 25 | 30 | 35 | 50;
  borderRadius?: 4 | 7 | 10 | 15 | 50 | 100;
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
    | "white";
  backgroundGradient?:
    | "green"
    | "violet"
    | "blue"
    | "tomato"
    | "yellow"
    | "orange";
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
};

export type BoxTypeProps = JoinTypeProps & {
  responsive?: {
    maxMedia?: number;
    minMedia?: number;
    style: JoinTypeProps;
  }[];
  [key: string | number | symbol]: any;
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
      state?.className || className || "",
      state?.pl || pl ? `UI-2ANI-BOX-padding-left-${state?.pl || pl}` : "",
      state?.pr || pr ? `UI-2ANI-BOX-padding-right-${state?.pr || pr}` : "",
      state?.pb || pb ? `UI-2ANI-BOX-padding-bottom-${state?.pb || pb}` : "",
      state?.pt || pt ? `UI-2ANI-BOX-padding-top-${state?.pt || pt}` : "",
      state?.ml || ml ? `UI-2ANI-BOX-margin-left-${state?.ml || ml}` : "",
      state?.mr || mr ? `UI-2ANI-BOX-margin-right-${state?.mr || mr}` : "",
      state?.mb || mb ? `UI-2ANI-BOX-margin-bottom-${state?.mb || mb}` : "",
      state?.mt || mt ? `UI-2ANI-BOX-margin-top-${state?.mt || mt}` : "",
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

  return (
    <>
      {loadingBox || loading ? (
        <div
          {...{ ...props, ...(style ? { style } : {}) }}
          className={classInline}
        >
          <Skeleton />
        </div>
      ) : (
        <div
          {...{ ...props, ...(style ? { style } : {}) }}
          onMouseEnter={(e: any) => onHover?.(true, e)}
          onMouseLeave={(e: any) => onHover?.(false, e)}
          onClick={(e: any) => onClick?.(e)}
          className={classInline}
          ref={customRef}
        >
          {children || ""}
        </div>
      )}
    </>
  );
};

export default Box;
