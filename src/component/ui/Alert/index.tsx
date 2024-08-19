import React from "react";
import { IconTypeMap } from "../../Icon/arrayType";
import { returnStyle } from "../../utils/style";
import styles from "./Alert.module.css";
import Icon from "../../Icon";
import { randText } from "../../utils/fs";

export type AlertProps = {
  type?: "success" | "error" | "info";
  title?: string;
  option?: {
    label: string;
    to: string;
  };
  description?: string;
  onClose?: () => void;
  width?: string;
  className?: string;
  icon?: IconTypeMap;
};

export type AlertSnackbarProps = {
  open?: boolean;
  onToggleIsOpen?: (open: boolean) => void;
  duration?: number;
} & AlertProps;

const AlertComponent = ({
  title = "Alert",
  type = "success",
  description = "",
  onClose = () => {},
  option,
  width = "100%",
  className = "",
  icon,
}: AlertProps) => {
  const buildClassName = React.useMemo(
    () => ["alert", `alert-type--${type}`, className || ""],
    [className, type]
  );

  const buildClassNameIcon = React.useMemo(
    () => [`alert-icon--${type}`],
    [type]
  );

  const returnUrlOption = (url: string) => window.open(url, "_blank");

  return (
    <div>
      <div className={returnStyle(buildClassName, styles)} style={{ width }}>
        <div
          className={returnStyle(
            ["util-flex", "util-flex--align-center", "util-flex--gap8"],
            styles
          )}
        >
          <div
            className={returnStyle(
              ["util-flex", "util-flex--align-center"],
              styles
            )}
          >
            {icon && (
              <Icon
                className={returnStyle(buildClassNameIcon, styles)}
                size={24}
                type={icon}
              />
            )}
          </div>
          <div>
            <span>{title}</span>
            {description && (
              <div>
                <span>{description}</span>
              </div>
            )}
          </div>
        </div>
        <div
          className={returnStyle(
            [
              "util-flex",
              "util-flex--align-center",
              "util-flex--gap8",
              "util-flex--justify-end",
            ],
            styles
          )}
        >
          <div
            className={returnStyle(
              ["util-flex", "util-flex--align-center", ...buildClassNameIcon],
              styles
            )}
          >
            {option && (
              <span
                className={returnStyle(["alert-option"], styles)}
                onClick={() => returnUrlOption(option?.to || "/")}
              >
                {option?.label || "Option"}
              </span>
            )}
          </div>
          <div
            className={returnStyle(
              ["util-flex", "util-flex--align-center"],
              styles
            )}
            onClick={onClose}
          >
            <Icon
              className={returnStyle(
                [...buildClassNameIcon, "alert-icon--hover"],
                styles
              )}
              type="close"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Alert = ({
  open,
  onToggleIsOpen,
  duration = 5500,
  ...arg
}: AlertSnackbarProps) => {
  const [timeClear, setTimeClear] =
    React.useState<ReturnType<typeof setTimeout>>();

  const onHandleClose = () => {
    onToggleIsOpen?.(false);
    if (timeClear) {
      clearTimeout(timeClear);
    }
  };

  const openClass = React.useMemo(() => {
    if (open) {
      const clearTimeFc = setTimeout(() => {
        onToggleIsOpen?.(false);
      }, duration || 5500);

      setTimeClear(clearTimeFc);

      return [`alert-snackbar--open`];
    }

    return [`alert-snackbar--no-event`];
  }, [open, onToggleIsOpen, duration]);

  return (
    <div
      className={returnStyle(
        ["util-flex", "util-flex--justify-center"],
        styles
      )}
    >
      <div className={returnStyle(["alert-snackbar", ...openClass], styles)}>
        <AlertComponent {...arg} onClose={onHandleClose} />
      </div>
    </div>
  );
};

export default Alert;

type TypeAlertNotification = {
  text?: string;
  title?: string;
};

export const alert = ({ text, title }: TypeAlertNotification) => {
  const modalElement: any = document.getElementById("__alert");
  modalElement.className = styles.__alert;

  const appElement: any = document.getElementById("__menu_color");
  const appStyle = window.getComputedStyle(appElement);
  const backgroundColor = appStyle.backgroundColor;
  const color = appStyle.color;

  const id = `___alert-${randText(20)}`;

  const modal = document.createElement("div");
  modal.className = styles.__alertContainer;
  modal.style.backgroundColor = backgroundColor;
  modal.style.color = color;
  modal.innerHTML = `${
    title ? `<div class="${styles.__alertTitle}">` + title + "</div>" : ""
  }${text || ""}`;
  modal.id = id;

  modalElement.appendChild(modal);

  setTimeout(() => {
    modalElement.removeChild(modal);
  }, 5000);
};

type TypeAlertConfirm = {
  text?: string;
  buttonAccept?: {
    title?: string;
    click?: Function;
  };
  buttonCancel?: {
    title?: string;
    click?: Function;
  };
  type?: "error" | "warning" | "success" | "info";
};

export const alertConfirm = ({
  text = "",
  buttonAccept,
  buttonCancel,
  type = "error",
}: TypeAlertConfirm) => {
  try {
    const types = {
      error: {
        title: "Đã có lỗi sảy ra!",
        svg: SvgError,
      },
      success: {
        title: "Thành công!",
        svg: SvgSuccess,
      },
      warning: {
        title: "Cảnh báo!",
        svg: SvgWarning,
      },
      info: {
        title: "Thông báo!",
        svg: SvgInfo,
      },
    };
    const modalElement: any = document.getElementById("__modal");
    modalElement.innerHTML = "";
    const appElement: any = document.getElementById("__menu_color");
    const appStyle = window.getComputedStyle(appElement);
    const backgroundColor = appStyle.backgroundColor;
    const color = appStyle.color;
    const boxShadow = appStyle.boxShadow;

    const modal: any = document.createElement("div");
    modal.className = styles.alertConfirmContainer;
    modal.addEventListener("click", () => {
      modalElement.innerHTML = "";
    });

    const container: any = document.createElement("div");
    container.style.backgroundColor = backgroundColor;
    container.style.color = color;
    container.style.boxShadow = boxShadow;
    container.className = styles.alertConfirm;
    container.addEventListener("click", (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    });

    const content: any = document.createElement("div");
    content.className = styles.alertConfirmContent;
    content.innerHTML = `<div class="${styles.alertConfirmContentSvg}">
                            ${types[type].svg}
                          </div>
                          <div class="${styles.alertConfirmContentText}">
                            <h3>${types[type].title}</h3>
                            ${text}
                          </div>`;

    container.appendChild(content);

    const button: any = document.createElement("div");
    button.className = styles.alertConfirmButton;

    const buttonCancelElement: any = document.createElement("button");
    buttonCancelElement.innerText = buttonCancel?.title || "Hủy";
    buttonCancelElement.className = `${styles.alertConfirmButtonStyle} ${styles.danger}`;

    buttonCancelElement.addEventListener("click", (e: any) => {
      buttonCancel?.click?.();
      modalElement.innerHTML = "";
    });

    const buttonAcceptElement: any = document.createElement("button");
    buttonAcceptElement.innerText = buttonAccept?.title || "Xác nhận";
    buttonAcceptElement.className = `${styles.alertConfirmButtonStyle} ${styles.primary}`;

    buttonCancelElement.addEventListener("click", (e: any) => {
      buttonAccept?.click?.();
      modalElement.innerHTML = "";
    });

    button.appendChild(buttonCancelElement);
    button.appendChild(buttonAcceptElement);

    container.appendChild(button);

    modal.appendChild(container);

    modalElement.appendChild(modal);
  } catch (error) {
    console.error("Error in alertConfirm: ", error);
  }
};

export const SvgError = `<svg fill="red" fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path></svg>`;

export const SvgSuccess = `<svg fill="#52c41a" viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>`;

export const SvgInfo = `<svg fill="#1677ff" viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>`;

export const SvgWarning = `<svg fill="#faad14" viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>`;

// export {AlertSnackbarProps, AlertProps}