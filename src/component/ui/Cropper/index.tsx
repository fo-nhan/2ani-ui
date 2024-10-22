import "react-image-crop/dist/ReactCrop.css";
import React, { ReactNode, useRef } from "react";
import Modal from "../Modal";
import ModalCropper from "./ModalCropper";
import Text from "../Text";
import styles from "./Cropper.module.css";
import Box from "../Box";
import View from "../View";
import Icon from "../../Icon";

type TypeProps = {
  onSave?: (props: { file: any; files: any; fileObjectbase64: any }) => void;
  typeFile?: "png" | "jpg";
  name?: string;
  value?: string;
  aspect?: number;
  circular?: boolean;
  children?: ReactNode;
  className?: string;
  text?: string;
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
  sizeIcon?: number;
  crop?: boolean;
  multiple?: boolean;
};

const Cropper = ({
  onSave,
  typeFile = "png",
  name,
  value,
  aspect = 9 / 9,
  circular = false,
  children,
  className,
  text,
  borderRadius,
  sizeIcon = 30,
  crop = false,
  multiple = false,
}: TypeProps) => {
  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState<any>(null);
  const [files, setFiles] = React.useState<any>(null);

  const inputRef = useRef<any>(null);

  const handleInputClick = (e: any) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleImgChange = (e: any) => {
    if (crop) {
      setSrc(URL.createObjectURL(e.target.files[0]));
      setOpen(true);
    } else {
      onSave?.({
        file: e.target.files[0],
        fileObjectbase64: null,
        files: e.target.files,
      });
      setFiles(e.target.files);
    }
  };

  const handleSave = async (fileData: any, fileBase64: any) => {
    onSave?.({
      file: fileData,
      fileObjectbase64: fileBase64,
      files: [],
    });
    setFiles([fileData]);
    setOpen(false);
    setSrc(null);

    if (inputRef.current) (inputRef?.current as any).value = "";
  };

  return (
    <>
      <Modal
        onClose={(val) => {
          setOpen(val);
          if (inputRef.current) (inputRef?.current as any).value = "";
        }}
        isOpen={open}
        containerProps={{
          width: "100%",
          maxWidth: 600,
        }}
        title={
          <Box flex="flexCenter" align="center">
            <Text weight="600" size="h4">
              Chỉnh sửa hình ảnh
            </Text>
          </Box>
        }
        children={
          open ? (
            <ModalCropper
              aspect={aspect}
              src={src}
              onSave={handleSave}
              typeFile={typeFile}
              circular={circular}
              onClose={() => setOpen(false)}
            />
          ) : (
            <></>
          )
        }
      />
      <div
        onClick={handleInputClick}
        className={`${styles.container} ${className}`}
      >
        {children || (
          <CropReview
            text={text}
            files={files}
            borderRadius={borderRadius}
            sizeIcon={sizeIcon}
            handleInputClick={handleInputClick}
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleImgChange}
        {...{ name, value }}
      />
    </>
  );
};

const CropReview = ({
  files,
  text,
  sizeIcon,
  borderRadius,
  handleInputClick,
}: any) => {
  return (
    <Box className={styles.cropImg} borderRadius={borderRadius}>
      {files ? (
        <View
          className={styles.img}
          src={URL.createObjectURL(files[0])}
          borderRadius={borderRadius}
          onClick={handleInputClick}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            padding: "10px",
          }}
        >
          <Icon type="upload" size={sizeIcon} color="grey" />
          {text && (
            <Text align="center" weight="600" color="default" size="h1">
              {text}
            </Text>
          )}
        </div>
      )}
    </Box>
  );
};

export default Cropper;
