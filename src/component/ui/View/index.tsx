import React, { useState, useEffect, useRef } from "react";
import styles from "./View.module.css";
import Skeleton from "../Skeleton";
import Box, { BoxTypeProps } from "../Box";

export type ViewTypeProps = {
  src: string;
  alt?: string;
  className?: string;
  delay?: number; // Thêm prop để cấu hình thời gian trì hoãn
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
  borderRadius?: 4 | 7 | 10 | 15 | 50 | 100;
  classImage?: string;
  onClick?: Function;
  parentProps?: BoxTypeProps;
};

const View: React.FC<ViewTypeProps> = ({
  src,
  alt,
  className,
  delay = 100,
  height = "100%",
  width = "100%",
  borderRadius,
  classImage,
  onClick,
  parentProps,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.unobserve(entry.target);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    // Clean up observer on unmount
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (shouldLoad) {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        setTimeout(() => setIsLoaded(true), delay);
      };
    }
  }, [shouldLoad, src, delay]);

  return (
    <div
      ref={imgRef}
      className={`${height ? `UI-2ANI-BOX-height-${height}` : ""} ${
        height ? `UI-2ANI-BOX-width-${width}` : ""
      } ${
        borderRadius ? `UI-2ANI-BOX-borderRadius-${borderRadius}` : ""
      } ${className || ""}`}
    >
      {!isLoaded && (
        <Skeleton
          className={`${height ? `UI-2ANI-BOX-height-${height}` : ""} ${
            height ? `UI-2ANI-BOX-width-${width}` : ""
          } ${
            borderRadius ? `UI-2ANI-BOX-borderRadius-${borderRadius}` : ""
          } ${className || ""}`}
        />
      )}
      {!parentProps && shouldLoad && (
        <img
          className={`${styles.viewImage} ${
            borderRadius ? `UI-2ANI-BOX-borderRadius-${borderRadius}` : ""
          } ${isLoaded ? styles.loaded : ""} ${classImage || ""}`}
          src={src}
          alt={alt || "Image Alt"}
          style={{ display: isLoaded ? "block" : "none" }}
          onClick={(e) => onClick?.(e)}
        />
      )}
      {parentProps && shouldLoad && (
        <Box
          {...parentProps}
          className={`${height ? `UI-2ANI-BOX-height-${height}` : ""} ${
            height ? `UI-2ANI-BOX-width-${width}` : ""
          } ${
            borderRadius ? `UI-2ANI-BOX-borderRadius-${borderRadius}` : ""
          } ${parentProps?.className || ""} ${className || ""}`}
        >
          <img
            className={`${styles.viewImage} ${
              borderRadius ? `UI-2ANI-BOX-borderRadius-${borderRadius}` : ""
            } ${isLoaded ? styles.loaded : ""} ${classImage || ""}`}
            src={src}
            alt={alt || "Image Alt"}
            style={{ display: isLoaded ? "block" : "none" }}
            onClick={(e) => onClick?.(e)}
          />
        </Box>
      )}
    </div>
  );
};

export default View;
