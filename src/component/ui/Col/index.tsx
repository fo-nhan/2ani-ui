import React, { CSSProperties, ReactNode } from "react";
import useWidth from "../../hooks/useWidth";

type TypeProps = React.HTMLAttributes<HTMLDivElement> & {
  style?: CSSProperties;
  span?: number;
  children: ReactNode;
  xs?: number; // <768
  sm?: number; // >768 < 992
  md?: number; // >992 < 1200
  lg?: number; // >1200 <1600
  xl?: number; // >1600
};

const Col = ({
  style = {},
  span = 24,
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  ...props
}: TypeProps) => {
  const { layout, gap, row, index }: any = props;
  const widthUse: any = useWidth();
  const [spanCol, setSpanCol] = React.useState<any>(null);

  React.useEffect(() => {
    if (widthUse <= 768 && xs) return setSpanCol(xs);
    if (widthUse > 768 && widthUse <= 992 && sm) return setSpanCol(sm);
    if (widthUse > 992 && widthUse <= 1200 && md) return setSpanCol(md);
    if (widthUse > 1200 && widthUse <= 1600 && lg) return setSpanCol(lg);
    if (widthUse > 1600 && xl) return setSpanCol(xl);
    setSpanCol(null);
  }, [widthUse, layout, span, row]);


  return (
    <div
      style={{
        ...style,
        width: `calc(${
          layout ? (100 / layout) * (spanCol ? spanCol : row ? row : span) : 100
        }% - ${
          gap && gap[1]
            ? index %
                Math.round(layout / (spanCol ? spanCol : row ? row : span)) ===
              0
              ? (gap[1] / layout) *
                (layout - (spanCol ? spanCol : row ? row : span))
              : gap[1] -
                gap[1] / (layout / (spanCol ? spanCol : row ? row : span))
            : 1
        }px)`,
      }}
      {...props}
      key={index}
    >
      {children}
    </div>
  );
};

export default Col;
