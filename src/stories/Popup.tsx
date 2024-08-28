import React from "react";
import { Popup as PopupPage, UI2aniContext } from "../component";
import { PopupTypeProps } from "../component/ui/Popup";

const Popup = (props: PopupTypeProps) => {
  return (
    <UI2aniContext
      style={{
        width: "100%",
        background: "white",
        minHeight: "200px",
      }}
    >
      <PopupPage {...props}>Test</PopupPage>
    </UI2aniContext>
  );
};

export default Popup;
