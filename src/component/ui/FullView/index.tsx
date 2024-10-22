import React from "react";
import styles from "./FullView.module.css";
import Box, { BoxTypeProps } from "../Box";
import Icon from "../../Icon";
import { SizeOfElement } from "../../utils/fs";
import { ImageProps } from "../ImageGallery";

export type FullViewProps = {
  children: React.ReactNode;
  renderView?: (src?: string) => React.ReactNode;
  images?: ImageProps[];
  onClick?: (event?: Event) => void;
  noView?: boolean;
  indexSrc?: string;
};

const FullView = ({
  children,
  renderView,
  onClick,
  noView,
  images,
  indexSrc,
}: FullViewProps) => {
  const [open, setOpen] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState("");
  const onOpen = (val: boolean) => {
    setOpen(val);
    try {
      if (val) {
        const size = SizeOfElement(document.body);
        document.body.style.width = size.width + "px";
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "";
        document.body.style.width = "";
        setCurrentSrc("");
      }
    } catch (error) {}
  };

  const onPrev = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (images?.length) {
      const index = images.findIndex(
        (image) => image.src === (currentSrc || indexSrc)
      );
      const newImage = images[index - 1];

      setCurrentSrc(newImage?.src || images?.[images.length - 1]?.src || "");
    }
  };

  const onNext = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (images?.length) {
      const index = images.findIndex(
        (image) => image.src === (currentSrc || indexSrc)
      );
      const newImage = images[index + 1];

      setCurrentSrc(newImage?.src || images?.[0]?.src || "");
    }
  };
  return (
    <>
      {React.cloneElement(children as any, {
        onClick: (e: any) => {
          e?.preventDefault();
          e?.stopPropagation();
          onClick?.(e);
          if (!noView) {
            onOpen(true);
          }
        },
      })}

      {open && (
        <>
          <div className={styles.overlay}></div>
          <div className={styles.container}>
            <Box
              width={"100%"}
              height={"100%"}
              paddingY={20}
              position="relative"
              flex="flexCenter"
              align="center"
              onClick={() => onOpen(false)}
            >
              <Box
                width={"auto"}
                height={"auto"}
                maxWidth={1000}
                maxHeight={"75vh"}
                onClick={(e) => {
                  e?.preventDefault();
                  e?.stopPropagation();
                }}
                flex="flexCenter"
                align="center"
                className={styles.content}
              >
                {renderView ? renderView(currentSrc || indexSrc) : children}
              </Box>
              <Box
                width={40}
                height={40}
                flex="flexBetween"
                align="center"
                cursor="pointer"
                position="absolute"
                left={10}
                top={10}
                onClick={() => onOpen(false)}
              >
                <Icon color="white" size={30} type="close" />
              </Box>
              {images?.length && indexSrc ? (
                <>
                  <div className={styles.left} onClick={onPrev}>
                    <Icon type="arrow-left" color="white" />
                  </div>
                  <div className={styles.right} onClick={onNext}>
                    <Icon type="arrow-right" color="white" />
                  </div>
                </>
              ) : (
                ""
              )}
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default FullView;
