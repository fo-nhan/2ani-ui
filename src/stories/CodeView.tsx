import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeView = ({ code }: { code: string }) => (
  <SyntaxHighlighter language="javascript" style={solarizedlight}>
    {code}
  </SyntaxHighlighter>
);

export default CodeView;
