import React, { CSSProperties, ReactNode } from "react";
import styles from "./Row.module.css";
import useWidth from "../../hooks/useWidth";
import { returnStyle } from "../../utils/style";

type TypeProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  layout?: number;
  responsive?: [number, number, number, number, number] | []; //Tác dụng như layout nhưng responsive lần lượt cho các màn sx, sm,md, lg, xl. nếu number bằng 0 thì sẽ lấy layout
  spanResponsive?: [number, number, number, number, number];
  gap?: [number, number];
  style?: CSSProperties;
  xs?: number; // <768
  sm?: number; // >768 < 992
  md?: number; // >992 < 1200
  lg?: number; // >1200 <1600
  xl?: number; // >1600
};

const Row = ({
  children,
  layout = 24,
  responsive = [],
  spanResponsive,
  gap,
  style = {},
  xs,
  sm,
  md,
  lg,
  xl,
  ...props
}: TypeProps) => {
  const widthUse: any = useWidth();
  const responsiveLayoutFsn = () => {
    if (typeof responsive !== "undefined" && responsive && responsive.length) {
      if (widthUse <= 768 && responsive[0]) return responsive[0];
      if (widthUse > 768 && widthUse <= 992 && responsive[1])
        return responsive[1];
      if (widthUse > 992 && widthUse <= 1200 && responsive[2])
        return responsive[2];
      if (widthUse > 1200 && widthUse <= 1600 && responsive[3])
        return responsive[3];
      if (widthUse > 1600 && responsive[4]) return responsive[4];
      return layout;
    }
  };
  const responsiveSpanFsn = (value: any, index: any) => {
    if (spanResponsive && spanResponsive.length && spanResponsive[index]) {
      return setSpanRow(spanResponsive[index]);
    } else if (value) {
      return setSpanRow(value);
    } else {
      return setSpanRow(null);
    }
  };
  const [spanRow, setSpanRow] = React.useState<any>(null);
  const [responsiveLayout, setResponsiveLayout] = React.useState<any>(
    // typeof responsive !== "undefined" && responsive && responsive.length
    //   ? responsiveLayoutFsn()
    layout
  );

  React.useEffect(() => {
    setResponsiveLayout(
      responsive !== undefined && responsive && responsive.length
        ? responsiveLayoutFsn()
        : layout
    );
    if (widthUse <= 768) return responsiveSpanFsn(xs, 0);
    if (widthUse > 768 && widthUse <= 992) return responsiveSpanFsn(sm, 1);
    if (widthUse > 992 && widthUse <= 1200) return responsiveSpanFsn(md, 2);
    if (widthUse > 1200 && widthUse <= 1600) return responsiveSpanFsn(lg, 3);
    if (widthUse > 1600) return responsiveSpanFsn(xl, 4);
    setSpanRow(null);
  }, [widthUse, responsive]);

  return (
    <div
      {...props}
      style={{
        ...style,
        gap:
          gap && gap.length ? `${gap[0]}px ${gap[1] ? gap[1] + "px" : ""}` : 0,
      }}
      className={returnStyle(["row"], styles)}
    >
      {React.Children.map(children, (child: any, i) => {
        return React.cloneElement(child, {
          layout: responsiveLayout,
          gap: gap,
          row: spanRow,
          index: i + 1,
          key: i,
        });
      })}
    </div>
  );
};

export default Row;
