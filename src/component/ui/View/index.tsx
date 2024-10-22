import React, { useState, useEffect, useRef } from "react";
import styles from "./View.module.css";
import Skeleton from "../Skeleton";
import Box, { BoxTypeProps } from "../Box";
import { ImageProps } from "../ImageGallery";
import FullView from "../FullView";

type SizeWType =
  | "auto"
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
  | "30%"
  | "35%"
  | "40%"
  | "50%"
  | "75%"
  | "100%"
  | "25vw"
  | "50vw"
  | "75vw"
  | "100vw";

type SizeHType =
  | "auto"
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
  | "30%"
  | "35%"
  | "40%"
  | "50%"
  | "75%"
  | "100%"
  | "25vh"
  | "50vh"
  | "75vh"
  | "100vh";

type SizeMWType =
  | 20
  | 25
  | 30
  | 35
  | 40
  | 45
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

type SizeMHType =
  | 20
  | 25
  | 30
  | 35
  | 40
  | 45
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

export type ViewTypeProps = {
  src: string;
  alt?: string;
  className?: string;
  delay?: number; // Thêm prop để cấu hình thời gian trì hoãn
  width?: SizeWType;
  height?: SizeHType;
  widthImg?: SizeWType;
  heightImg?: SizeHType;

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
  classImage?: string;
  onClick?: Function;
  parentProps?: BoxTypeProps;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  maxWidth?: SizeMWType;
  maxHeight?: SizeMHType;
  maxWidthImg?: SizeMWType;
  maxHeightImg?: SizeMHType;

  onLoad?: (e: Event) => void;
  onComplete?: (e: Event) => void;
  onError?: (e: string | Event) => void;
  placeholder?: React.ReactNode;
  srcError?: string;
  fullView?: boolean;
  images?: ImageProps[];
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
  objectFit,
  maxHeight,
  maxWidth,
  onComplete,
  onLoad,
  onError,
  placeholder,
  srcError,
  fullView,
  images = [],
  heightImg = "100%",
  maxHeightImg,
  maxWidthImg,
  widthImg = "100%",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [error, setError] = useState("");
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.unobserve(entry.target);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.01,
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
      image.onload = (e) => {
        onLoad?.(e);
        setTimeout(() => {
          onComplete?.(e);
          setIsLoaded(true);
        }, delay);
      };
      image.onerror = (e) => {
        onError?.(e);
        if (srcError) {
          setError(srcError);
        }
        setIsLoaded(true);
      };
    }
  }, [shouldLoad, src, delay, srcError]);

  return (
    <>
      <FullView
        noView={!fullView}
        onClick={(e) => onClick?.(e)}
        images={images}
        renderView={(newSrc) => (
          <View
            src={newSrc || src}
            width={"auto"}
            height={"auto"}
            widthImg={"auto"}
            heightImg={"auto"}
            maxHeightImg={"75vh"}
            maxWidth={1000}
          />
        )}
        indexSrc={src}
      >
        <div
          ref={imgRef}
          className={`UI-2ANI-css-no-copy ${maxHeight ? `UI-2ANI-BOX-maxHeight-${maxHeight}` : ""}  ${maxWidth ? `UI-2ANI-BOX-maxWidth-${maxWidth}` : ""} ${height ? `UI-2ANI-BOX-height-${height}` : ""} ${
            width ? `UI-2ANI-BOX-width-${width}` : ""
          } ${
            borderRadius ? `UI-2ANI-BOX-borderRadius-${borderRadius}` : ""
          } ${className || ""}`}
        >
          {!isLoaded && (
            <>
              {placeholder || (
                <Skeleton
                  className={` ${styles.skeleton} ${
                    borderRadius
                      ? `UI-2ANI-BOX-borderRadius-${borderRadius}`
                      : ""
                  } ${classImage || ""}`}
                />
              )}
            </>
          )}
          {!parentProps && shouldLoad && (
            <img
              className={`${maxHeightImg ? `UI-2ANI-BOX-maxHeight-${maxHeightImg}` : ""}  ${maxWidthImg ? `UI-2ANI-BOX-maxWidth-${maxWidthImg}` : ""} ${heightImg ? `UI-2ANI-BOX-height-${heightImg}` : ""} ${
                widthImg ? `UI-2ANI-BOX-width-${widthImg}` : ""
              } ${styles.viewImage} ${
                borderRadius ? `UI-2ANI-BOX-borderRadius-${borderRadius}` : ""
              } ${isLoaded ? styles.loaded : ""} ${objectFit ? "UI-2ANI-BOX-objectFit-" + objectFit : ""} ${classImage || ""}`}
              src={error || src}
              alt={alt || "Image Alt"}
              style={{ display: isLoaded ? "block" : "none" }}
              onClick={(e) => onClick?.(e)}
            />
          )}
          {parentProps && shouldLoad && (
            <Box
              {...parentProps}
              className={`${maxHeight ? `UI-2ANI-BOX-maxHeight-${maxHeight}` : ""}  ${maxWidth ? `UI-2ANI-BOX-maxWidth-${maxWidth}` : ""} ${height ? `UI-2ANI-BOX-height-${height}` : ""} ${
                width ? `UI-2ANI-BOX-width-${width}` : ""
              } ${
                borderRadius ? `UI-2ANI-BOX-borderRadius-${borderRadius}` : ""
              } ${parentProps?.className || ""} ${className || ""}`}
            >
              <img
                className={`${maxHeightImg ? `UI-2ANI-BOX-maxHeight-${maxHeightImg}` : ""}  ${maxWidthImg ? `UI-2ANI-BOX-maxWidth-${maxWidthImg}` : ""} ${heightImg ? `UI-2ANI-BOX-height-${heightImg}` : ""} ${
                  widthImg ? `UI-2ANI-BOX-width-${widthImg}` : ""
                }  ${styles.viewImage} ${
                  borderRadius ? `UI-2ANI-BOX-borderRadius-${borderRadius}` : ""
                } ${isLoaded ? styles.loaded : ""} ${objectFit ? "UI-2ANI-BOX-objectFit-" + objectFit : ""} ${classImage || ""}`}
                src={error || src}
                alt={alt || "Image Alt"}
                style={{ display: isLoaded ? "block" : "none" }}
                onClick={(e) => onClick?.(e)}
              />
            </Box>
          )}
        </div>
      </FullView>
    </>
  );
};

export default View;
