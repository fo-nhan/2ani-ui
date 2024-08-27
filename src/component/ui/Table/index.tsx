import React, { CSSProperties } from "react";
import styles from "./Table.module.css";
import { moveTable } from "./function";

type TypeProps = {
  config: {
    key: any; //Tên của thuộc tính trong object
    title?: any; //Title muốn thể hiện, có thể không cần truyền
    center?: Boolean; //Title căn trái hoặc giữa (Mặc định là fale)
    centerItem?: Boolean; //các text trong item căn trái phải (Mặc định là false)
    width?: Number; //Width là độ rộng nhỏ nhất của width (Thật ra là minWidth)
    render?: Function; //Tự custom dữ liệu được trả ra hiển thị trên màn hình
    classTitle?: any; //ClassName của một cột trong title
    classItem?: any; //ClassName của một cột trong item
    styleItem?: CSSProperties; //Style của Item (Không có style của title để tránh ảnh hưởng đến các thuộc tính mặc định)
    onClick?: Function; //Sự kiện khi click vào cột của item
    colSpan?: Number; //Title chiếm bao nhiêu cột
    rowSpan?: Number; //Titke chiếm bao nhiêu dòng
  }[];
  data: any; //Dữ liệu truyền vào, bắt buộc là mảng
  hr?: Boolean; //HR ngăn cách title và item (Mặc định là false)
  hover?: Boolean; //Hover vào item (Mặc định là false)
  background?: Boolean; //Màu phân chia layout (Mặc định là false)
  className?: any; //ClassName của table
  classNameTitle?: any; //Class name của phần tử bao bọc toàn bộ title
  classNameItem?: any; //Class name của một item
  styleRowItem?: CSSProperties; //Style của một item
  styleRowTitle?: CSSProperties; //Style của một title
  style?: CSSProperties; //Style của table
  isMove?: boolean;
};

const Table = ({
  config,
  data,
  hr,
  hover,
  background,
  className,
  classNameTitle,
  classNameItem,
  styleRowItem,
  styleRowTitle,
  style,
  isMove = false,
}: TypeProps) => {
  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    if (ref.current && isMove) {
      moveTable(ref.current);
    }
  }, [ref, isMove]);

  return (
    <div className={styles.container || ""}>
      <table
        style={style}
        className={`${styles.table || ""} ${className || ""}`}
        ref={ref}
      >
        <tbody className={styles.header}>
          <tr
            style={styleRowTitle}
            className={` ${styles.tr || ""} ${
              classNameTitle ? classNameTitle : ""
            }`}
          >
            {config.map((val: any, index: any) => {
              return (
                <th
                  className={` ${styles.td} ${
                    val.center ? styles.center : styles.left
                  } ${hr ? styles.hr : ""} ${
                    val.classTitle ? val.classTitle : ""
                  }`}
                  key={index}
                  style={{
                    minWidth: `${val.width + "px" ? val.width + "px" : "auto"}`,
                  }}
                  colSpan={val.colSpan}
                  rowSpan={val.rowSpan}
                >
                  {val.title ? val.title : ""}
                </th>
              );
            })}
          </tr>
        </tbody>

        {data && data.length > 0
          ? data.map((val: any, index: any) => {
              return (
                <tbody className={styles.body} key={index}>
                  <tr
                    className={`${styles.tr} ${
                      background ? styles.trLayout : ""
                    } ${hover ? styles.trHover : ""} ${
                      classNameItem ? classNameItem : ""
                    }`}
                    key={index}
                    style={styleRowItem}
                  >
                    {config.map((vaz: any, idx: any) => {
                      return (
                        <td
                          className={`${styles.td}  ${
                            val.centerItem ? styles.center : styles.left
                          } ${vaz.classItem ? vaz.classItem : ""}`}
                          key={idx}
                          style={vaz.styleItem}
                          onClick={(e: any) => {
                            if (vaz.onClick) {
                              return vaz.onClick(val[vaz.key], index, val, e);
                            }
                          }}
                        >
                          {vaz.render
                            ? vaz.render(val[vaz.key], index, val)
                            : val[vaz.key]}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              );
            })
          : ""}
      </table>
    </div>
  );
};

export default Table;
