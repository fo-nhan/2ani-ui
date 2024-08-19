import React from "react";
import styles from "./Modal.module.css";
import useDetectElement from "../../hooks/useDetectElement";
import Icon from "../../Icon";
import useAniState from "../../hooks/useAniState";

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
}: ModalProps) {
  const ref = React.useRef(null);

  const isDetect = useDetectElement(ref);

  const { theme } = useAniState();

  React.useEffect(() => {
    onClose?.(isDetect, ref?.current || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetect]);

  if (!isOpen || !isDetect) return null;

  return (
    <div className={`${styles.modalOverlay} ${classOverlay}`}>
      <div
        className={`${styles.modal} UI-2ANI-${size} ${theme?.backgroundColorClass}`}
        ref={ref}
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
        <div className={`${styles.modalBody} ${classContent}`}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
