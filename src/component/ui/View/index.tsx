import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties, useRef } from "react";
import styles from "./View.module.css";
import Skeleton from "../Skeleton";

type TypeProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  style?: CSSProperties;
  classChildren?: string;
  styleChildren?: CSSProperties;
  borderRadius?: number | string;
  hoverZoom?: boolean;
  imageKey?: any;
};

const View = ({
  src,
  style,
  classChildren = "",
  styleChildren,
  borderRadius = 0,
  hoverZoom = false,
  imageKey,
  ...props
}: TypeProps) => {
  const ref = useRef<any>();
  const [loading, setLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState<any>();

  return (
    <div
      {...props}
      className={`${hoverZoom ? styles.imageHover : ""} ${props.className}`}
      style={{ position: "relative", overflow: "hidden", ...style }}
      ref={ref}
    >
      {loading && (
        <Skeleton
          className={classChildren}
          style={{
            ...styleChildren,
            borderRadius: borderRadius,
          }}
        />
      )}
      
      {src && !loading ? (
        <>
          <Image
              alt={"Can't open"}
              className={classChildren}
              style={{
                ...styleChildren,
                borderRadius: borderRadius,
              }}
              onLoadingComplete={() => {
                setLoading(false);
              }}
              onLoad={() => setLoading(false)}
              priority
              placeholder="blur"
              layout="fill"
              src={`${imgSrc || src}`}
              blurDataURL={`${imgSrc || src}`}
              {...(imageKey ? { key: imageKey } : {})}
              onError={(event: any) => {
                event.target.id = src;
                event.target.srcset = src;
                setImgSrc(src);
              }}
            />
        </>
      ) : ""}
    </div>
  );
};

export default View;
