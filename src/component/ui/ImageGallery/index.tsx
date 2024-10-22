import React from "react";
import styles from "./ImageGallery.module.css";
import Skeleton from "../Skeleton";
import View from "../View";
import Box from "../Box";
import Text from "../Text";
import { SizeOfElement } from "../../utils/fs";
import FullView from "../FullView";

export type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

interface ImageGalleryProps {
  images: ImageProps[];
  gap?: 0 | 3 | 5 | 10 | 15 | 20;
  padding?: 0 | 3 | 5 | 10 | 15 | 20;
  list?: {
    width: number;

    /** wHeight is a percentage value */
    /** wHeight là một số % từ 0-100 height sẽ dựa tương đối vào width*/
    wHeight?: number; // percent
  };
  onClickItem?: (item: ImageProps) => void;
  fullView?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = [],
  gap = 0,
  padding = 0,
  list,
  fullView,
  onClickItem = () => {},
}) => {
  const [prevImages, setPrevImages] = React.useState<ImageProps[]>([]);
  const [renderImages, setRenderImages] = React.useState<React.ReactNode>(
    <></>
  );
  const ref = React.useRef<any>(null);

  const loadingImages = React.useCallback(() => {
    if (!images || !images.length) {
      return <Skeleton width="100%" height="35vh" />;
    }

    if (images.length === 1) {
      const img = images[0];
      return (
        <div className={`UI-2ANI-BOX-width-100% UI-2ANI-BOX-height-100%`}>
          <View
            src={img.src}
            width={"100%"}
            objectFit="cover"
            maxHeight={"100%"}
            images={images}
            fullView={fullView}
          />
        </div>
      );
    }

    if (images.length === 2) {
      const img1 = images[0];
      const img2 = images[1];
      let classNameWidth = "";
      let classNameHeight = "";

      if (img1.width > img1.height) {
        classNameWidth = `UI-2ANI-BOX-width-100%`;
        classNameHeight = "UI-2ANI-BOX-height-50%";
      } else {
        classNameWidth = styles[`UI-2ANI-Gallery-width-50-gap-${gap}`];
        classNameHeight = "UI-2ANI-BOX-height-100%";
      }

      return (
        <>
          <div className={`${classNameWidth} ${classNameHeight}`}>
            <View
              src={img1.src}
              width={"100%"}
              objectFit="cover"
              maxHeight={"100%"}
              onClick={() => onClickItem?.(img1)}
              images={images}
              fullView={fullView}
            />
          </div>
          <div className={`${classNameWidth} ${classNameHeight}`}>
            <View
              src={img2.src}
              width={"100%"}
              objectFit="cover"
              maxHeight={"100%"}
              onClick={() => onClickItem?.(img2)}
              images={images}
              fullView={fullView}
            />
          </div>
        </>
      );
    }

    if (images.length === 3) {
      const img1 = images[0];
      const img2 = images[1];
      const img3 = images[2];
      let classNameWidth = "";
      let classNameHeight = "";
      let letter = false;

      if (img1.width > img1.height) {
        classNameWidth = `UI-2ANI-BOX-width-100%`;
        classNameHeight = "UI-2ANI-BOX-height-50";
        letter = false;
      } else {
        classNameWidth = styles[`UI-2ANI-Gallery-width-50-gap-${gap}`];
        classNameHeight = "UI-2ANI-BOX-height-100";
        letter = true;
      }

      return (
        <>
          <div className={`${classNameWidth} ${classNameHeight}% `}>
            <View
              src={img1.src}
              width={"100%"}
              objectFit="cover"
              maxHeight={"100%"}
              onClick={() => onClickItem?.(img1)}
              images={images}
              fullView={fullView}
            />
          </div>
          <div
            className={`${classNameWidth} ${classNameHeight}% ${styles.rowImage} ${styles[`gap-${gap}`]} ${styles[`${classNameHeight}-as-Gallery-gap-${gap}-line-2`]}`}
          >
            <View
              src={img2.src}
              width={letter ? "100%" : "50%"}
              objectFit="cover"
              height={letter ? "50%" : "100%"}
              className={
                classNameHeight === "UI-2ANI-BOX-height-50"
                  ? styles[`UI-2ANI-Gallery-width-50-gap-${gap}`]
                  : ""
              }
              onClick={() => onClickItem?.(img2)}
              images={images}
              fullView={fullView}
            />
            <View
              src={img3.src}
              width={letter ? "100%" : "50%"}
              objectFit="cover"
              height={letter ? "50%" : "100%"}
              className={
                classNameHeight === "UI-2ANI-BOX-height-50"
                  ? styles[`UI-2ANI-Gallery-width-50-gap-${gap}`]
                  : ""
              }
              onClick={() => onClickItem?.(img3)}
              images={images}
              fullView={fullView}
            />
          </div>
        </>
      );
    }

    if (images.length === 4) {
      const img1 = images[0];
      const img2 = images[1];
      const img3 = images[2];
      const img4 = images[3];

      return (
        <>
          <div
            className={`UI-2ANI-BOX-width-100% UI-2ANI-BOX-height-50% ${styles.rowImage} ${styles[`gap-${gap}`]} ${styles[`UI-2ANI-BOX-height-50-as-Gallery-gap-${gap}-line-2`]}`}
          >
            <View
              src={img1.src}
              width={"50%"}
              objectFit="cover"
              maxHeight={"100%"}
              className={`${styles[`UI-2ANI-Gallery-width-50-gap-${gap}`]}`}
              onClick={() => onClickItem?.(img1)}
              images={images}
              fullView={fullView}
            />
            <View
              src={img2.src}
              width={"50%"}
              objectFit="cover"
              height={"100%"}
              className={`${styles[`UI-2ANI-Gallery-width-50-gap-${gap}`]}`}
              onClick={() => onClickItem?.(img2)}
              images={images}
              fullView={fullView}
            />
          </div>
          <div
            className={`UI-2ANI-BOX-width-100% UI-2ANI-BOX-height-50% ${styles.rowImage} ${styles[`gap-${gap}`]} ${styles[`UI-2ANI-BOX-height-50-as-Gallery-gap-${gap}-line-2`]}`}
          >
            <View
              src={img3.src}
              width={"50%"}
              objectFit="cover"
              height={"100%"}
              className={`${styles[`UI-2ANI-Gallery-width-50-gap-${gap}`]}`}
              onClick={() => onClickItem?.(img2)}
              images={images}
              fullView={fullView}
            />
            <View
              src={img4.src}
              width={"50%"}
              objectFit="cover"
              height={"100%"}
              className={`${styles[`UI-2ANI-Gallery-width-50-gap-${gap}`]}`}
              onClick={() => onClickItem?.(img4)}
              images={images}
              fullView={fullView}
            />
          </div>
        </>
      );
    }

    const img1 = images[0];
    const img2 = images[1];
    const img3 = images[2];
    const img4 = images[3];
    const img5 = images[4];
    let classNameWidth = "";
    let classNameHeight = "";
    let letter = false;

    if (img1.width > img1.height) {
      classNameWidth = `UI-2ANI-BOX-width-100%`;
      classNameHeight = "UI-2ANI-BOX-height-50";
      letter = false;
    } else {
      classNameWidth = styles[`UI-2ANI-Gallery-width-50-gap-${gap}`];
      classNameHeight = "UI-2ANI-BOX-height-100";
      letter = true;
    }

    return (
      <>
        <div
          className={`${classNameWidth} ${classNameHeight}%  ${styles.rowImage} ${styles[`gap-${gap}`]} ${styles[`${classNameHeight}-as-Gallery-gap-${gap}-line-2`]}`}
        >
          <View
            src={img1.src}
            width={letter ? "100%" : "50%"}
            objectFit="cover"
            maxHeight={letter ? "50%" : "100%"}
            className={
              !letter ? styles[`UI-2ANI-Gallery-width-50-gap-${gap}`] : ""
            }
            onClick={() => onClickItem?.(img1)}
            images={images}
            fullView={fullView}
          />
          <View
            src={img2.src}
            width={letter ? "100%" : "50%"}
            objectFit="cover"
            maxHeight={letter ? "50%" : "100%"}
            className={
              !letter ? styles[`UI-2ANI-Gallery-width-50-gap-${gap}`] : ""
            }
            onClick={() => onClickItem?.(img2)}
            images={images}
            fullView={fullView}
          />
        </div>
        <div
          className={`${classNameWidth} ${classNameHeight}% ${styles.rowImage} ${styles[`gap-${gap}`]} ${letter ? styles[`${classNameHeight}-as-Gallery-gap-${gap}-line-3`] : ""}`}
        >
          <View
            src={img3.src}
            width={letter ? "100%" : "35%"}
            objectFit="cover"
            height={letter ? "30%" : "100%"}
            className={
              !letter ? styles[`UI-2ANI-Gallery-width-35-gap-${gap}`] : ""
            }
            onClick={() => onClickItem?.(img3)}
            images={images}
            fullView={fullView}
          />
          <View
            src={img4.src}
            width={letter ? "100%" : "30%"}
            objectFit="cover"
            height={letter ? "30%" : "100%"}
            className={
              !letter ? styles[`UI-2ANI-Gallery-width-30-gap-${gap}`] : ""
            }
            onClick={() => onClickItem?.(img4)}
            images={images}
            fullView={fullView}
          />
          <FullView
            noView={!fullView}
            images={images}
            indexSrc={img5.src}
            renderView={(newSrc) => (
              <View src={newSrc || img5.src} width={"auto"} height={"auto"} />
            )}
          >
            <Box
              width={letter ? "100%" : "35%"}
              height={letter ? "40%" : "100%"}
              position="relative"
              className={
                !letter ? styles[`UI-2ANI-Gallery-width-35-gap-${gap}`] : ""
              }
            >
              <View
                src={img5.src}
                width={"100%"}
                objectFit="cover"
                height={"100%"}
                onClick={() => (images.length > 5 ? {} : onClickItem?.(img5))}
              />
              {images.length > 5 ? (
                <>
                  <Box
                    background="black"
                    opacity="40%"
                    position="absolute"
                    top={"0"}
                    left={"0"}
                    width={"100%"}
                    height={"100%"}
                  ></Box>
                  <Box
                    position="absolute"
                    top={"0"}
                    left={"0"}
                    width={"100%"}
                    height={"100%"}
                    flex="flexColumn"
                    align="center"
                    justify="center"
                    textShadow="black"
                    backgroundHover="black"
                    onClick={() => onClickItem?.(img5)}
                  >
                    <Text weight="800" color="white" size="h4">
                      +{images.length - 5}
                    </Text>
                    <Text weight="800" color="white">
                      (Xem thêm)
                    </Text>
                  </Box>
                </>
              ) : (
                ""
              )}
            </Box>
          </FullView>
        </div>
      </>
    );
  }, [prevImages, images]);

  const loadingImagesByList = React.useCallback(() => {
    if (!images.length || !list || !ref.current) {
      return <></>;
    }
    const size = SizeOfElement(ref.current);

    const countCol = Math.floor(size.width / list.width) || 1;
    let arrayItems: any = Array.from({ length: countCol }, () => []);
    let refreshIndex = 0;

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      arrayItems[refreshIndex].push(element);

      if (refreshIndex + 1 === countCol) {
        refreshIndex = 0;
      } else {
        refreshIndex = refreshIndex + 1;
      }
    }

    return (
      <>
        {arrayItems.map((parent: any, i: number) => (
          <div
            key={i}
            style={{
              width: `calc((100% / ${arrayItems.length}) - ${gap}px)`,
            }}
            className={`${styles.rowImageList} ${styles[`gap-${gap}`]}`}
          >
            {parent?.length
              ? parent.map((child: any, d: any) => (
                  <Box
                    width={"100%"}
                    style={{
                      height: list.wHeight
                        ? `${list.width * (list.wHeight / 100)}px`
                        : "auto",
                      maxHeight: `${child.height > list.width ? list.width : child.height}px`,
                      minHeight: `${child.height > list.width ? list.width : child.height}px`,
                    }}
                    key={d}
                    onClick={() => onClickItem?.(child)}
                  >
                    <View
                      width={"100%"}
                      src={child.src}
                      height={"100%"}
                      objectFit="cover"
                      images={images}
                      fullView={fullView}
                    />
                  </Box>
                ))
              : ""}
          </div>
        ))}
      </>
    );
  }, [images, prevImages, list]);

  React.useEffect(() => {
    const imagesChanged = JSON.stringify(images) !== JSON.stringify(prevImages);

    if (images && imagesChanged) {
      if (list) {
        const html = loadingImagesByList();
        setRenderImages(html);
      } else {
        const html = loadingImages();
        setRenderImages(html);
      }

      setPrevImages(images);
    }
  }, [images, prevImages, list, ref]);

  return (
    <div
      ref={ref}
      className={`UI-2ANI-css-no-copy ${styles.gallery} ${styles[`gap-${gap}`]} ${styles[`UI-2ANI-Gallery-padding-${padding}`]}`}
    >
      {renderImages}
    </div>
  );
};

export default ImageGallery;
