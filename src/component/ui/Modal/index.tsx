import React from "react";
import styles from "./Modal.module.css";
import useDetectElement from "../../hooks/useDetectElement";
import Icon from "../../Icon";
import useAniState from "../../hooks/useAniState";
import Box, { BoxTypeProps } from "../Box";
import { SizeOfElement } from "../../utils/fs";

export type ModalProps = {
  title?: string | React.ReactNode;
  isOpen: boolean;
  onClose: (
    open: boolean,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  children: React.ReactNode;
  noClose?: boolean;
  classOverlay?: string;
  classContent?: string;
  classHeader?: string;
  classTitle?: string;
  size?: "lg" | "sm" | "xs" | "auto" | "fw" | "md";
  containerProps?: BoxTypeProps;
  contentProps?: BoxTypeProps;
  overlayProps?: BoxTypeProps;
};

function Modal({
  title,
  isOpen,
  onClose,
  children,
  noClose = false,
  classContent = "",
  classHeader = "",
  classOverlay = "",
  classTitle = "",
  size = "sm",
  containerProps = {},
  contentProps = {},
  overlayProps = {},
}: ModalProps) {
  const ref = React.useRef(null);

  const isDetect = useDetectElement(ref);

  const { theme } = useAniState();

  React.useEffect(() => {
    if (isOpen) {
      onClose?.(false, ref?.current || undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetect]);

  React.useEffect(() => {
    if (isOpen) {
      const size = SizeOfElement(document.body);
      document.body.style.width = size.width + "px";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
      document.body.style.width = "";
    }
  }, [isOpen])

  if (!isOpen || !isDetect) return null;

  return (
    <Box {...overlayProps} className={`${styles.modalOverlay} ${classOverlay}`}>
      <Box
        {...containerProps}
        className={`${styles.modal} UI-2ANI-${size} ${theme?.backgroundColorClass}`}
        customRef={ref}
      >
        <div className={`${styles.modalHeader} ${classHeader}`}>
          <div className={`${styles.modalHeaderTitle} ${classTitle}`}>
            {title}
          </div>
          {!noClose && (
            <button
              className={styles.modalClose}
              onClick={(e) => onClose?.(false, e)}
            >
              <Icon type="close" />
            </button>
          )}
        </div>
        <Box
          {...contentProps}
          className={`${styles.modalBody} ${classContent}`}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Modal;
