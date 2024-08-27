import React from "react";
import { Box as BoxPage, UI2aniContext } from "../component";
import { BoxTypeProps } from "../component/ui/Box";

const Box = (props: BoxTypeProps) => {
  return (
    <UI2aniContext
      style={{
        width: "100%",
        background: "white",
        minHeight: "200px",
      }}
    >
      <BoxPage {...props}>Test</BoxPage>
    </UI2aniContext>
  );
};

export default Box;
