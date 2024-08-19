import React from "react";
import { ModalProps } from "../component/ui/Modal";
import { Button, UI2aniContext, Modal as ModalDemo } from "../component";

const Modal = (props: ModalProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <UI2aniContext defaultThemeKey="light">
      <div style={{ height: "400px" }}>
        <Button onClick={() => setIsOpen(true)}>Open</Button>

        <ModalDemo
          {...{ ...props, isOpen: isOpen, onClose: (open) => setIsOpen(open) }}
        />
      </div>
    </UI2aniContext>
  );
};

export default Modal;
