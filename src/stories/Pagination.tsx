import React from "react";
import { Box, Pagination as PaginationPage, UI2aniContext } from "../component";
import { PaginationProps } from "../component/ui/Pagination";
import "../component/styles/config.css";

const Pagination = (props: PaginationProps) => {
  return (
    <UI2aniContext
      style={{
        width: "100%",
        background: "white",
        minHeight: "200px",
      }}
    >
      <Box width={400}>
        <PaginationPage {...props} />
      </Box>
    </UI2aniContext>
  );
};

export default Pagination;
