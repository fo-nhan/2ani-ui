import React, { useRef } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import Text from "../Text";
import Button from "../Button";
import styles from "./Cropper.module.css";
import { randText } from "../../utils/fs";
import Box from "../Box";

type TypeProps = {
  typeFile?: "png" | "jpg";
  onSave?: (file: any, fileBase64?: any) => void;
  src: any;
  aspect?: number;
  circular?: boolean;
  onClose?: () => void
};

const ModalCropper = ({
  typeFile,
  onSave,
  src,
  aspect = 9 / 9,
  circular = false,
  onClose = () => {}
}: TypeProps) => {
  const cropRef = useRef<any>(null);
  const [zoom, setZoom] = React.useState<any>(0);
  const [rotate, setRotate] = React.useState<any>(0);
  const [crop, setCrop] = React.useState<Crop>();
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>();
  const [fileData, setFileData] = React.useState<any>(null);

  const canvasRef = useRef<any>(null);

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  const getCroppedImg = (image: any, crop: any) => {
    const canvas = canvasRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx: any = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvasRef.current?.toBlob((blob: any) => {
      let file = new File([blob], `${randText(20)}.${typeFile}`, {
        type: `image/${typeFile}`,
      });
      setFileData(file);
    }, `image/${typeFile}`);
  };

  React.useEffect(() => {
    if (completedCrop && cropRef.current && canvasRef.current) {
      getCroppedImg(cropRef.current, completedCrop);
    }
  }, [completedCrop]);

  const handleSave = async () => {
    const fileBase64 = canvasRef.current?.toDataURL(`image/${typeFile}`);

    onSave?.(fileData, fileBase64);
    setCrop(undefined);
  };

  return (
    <Box overflowY="hidden">
      <Box overflowY="hidden" minWidth="100%" flex="flexAlign" align="center">
        <Box
          maxHeight={400}
          maxWidth={400}
          overflowY="hidden"
          overflowX="hidden"
          flex="flexCenter"
          align="center"
          width={"100%"}
          height={"100%"}
        >
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => {
              if (percentCrop.width > 20) {
                setCrop(percentCrop);
              }
            }}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            circularCrop={circular}
          >
            <img
              ref={cropRef}
              onLoad={onImageLoad}
              src={src}
              style={{ maxHeight: "400px", transform: `rotate(${rotate}deg)` }}
            />
          </ReactCrop>
        </Box>
      </Box>
      <canvas style={{ display: "none" }} ref={canvasRef}></canvas>
      <Box minWidth="100%" overflowY="hidden" flex="flexColumn" align="center">
        <Box
          flex="flexStart"
          align="center"
          gap={10}
          maxHeight={400}
          maxWidth={400}
        >
          <Text style={{ width: "20px" }} weight="900">
            {rotate}
          </Text>
          <input
            type="range"
            max={360}
            className={styles.input}
            min={0}
            onChange={(e: any) => setRotate(e.target.value)}
            value={Number(rotate)}
          />
        </Box>
      </Box>
      <Box flex="flexEnd" gap={5}>
        <Button onClick={onClose} theme="default" size="auto">
          Hủy
        </Button>
        <Button onClick={handleSave} size="auto">
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default ModalCropper;
