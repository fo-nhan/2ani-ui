import React from "react";
import { Sort } from "../utils/fs";

type ImageProps = {
  src: string;
  alt: string;
};

export type FileImageType = {
  src: string;
  href: string;
  width: number;
  height: number;
  alt: string;
};

const useGetSizeImage = (images: ImageProps[]): FileImageType[] => {
  const [imageLoads, setImageLoads] = React.useState<FileImageType[]>([]);
  const [prevImages, setPrevImages] = React.useState<ImageProps[]>([]);

  React.useEffect(() => {

    if (images) {
      const loadImageDimensions = () => {
        const dimensions: any = [];

        Promise.all(
          images.map(
            (item, i) =>
              new Promise<void>((resolve) => {
                try {
                  const img = new Image();
                  img.src = item.src;
                  img.onload = () => {
                    dimensions.push({
                      src: item.src,
                      href: item.src,
                      width: img.width,
                      height: img.height,
                      alt: item.src,
                      key: i,
                    });
                    resolve();
                  };
                  img.onerror = () => {
                    dimensions.push({
                      src: item.src,
                      href: item.src,
                      width: 100,
                      height: 100,
                      alt: item.src,
                      key: i,
                    });
                    resolve();
                  };
                } catch (error) {
                  dimensions.push({
                    src: item.src,
                    href: item.src,
                    width: 100,
                    height: 100,
                    alt: item.src,
                    key: i,
                  });
                  resolve();
                }
              })
          )
        )
          .then(() => setImageLoads(Sort.asc(dimensions, "key")))
          .catch((error) => {
            console.error("An error occurred while loading images:", error);
          });
      };

      loadImageDimensions();
      setPrevImages(images); // Lưu lại giá trị của images để kiểm tra trong lần tiếp theo
    }
  }, [JSON.stringify(images) !== JSON.stringify(prevImages)]); // Thêm prevImages làm dependency

  return imageLoads;
};

export default useGetSizeImage;
