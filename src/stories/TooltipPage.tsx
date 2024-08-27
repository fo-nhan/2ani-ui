import React from "react";
import { TooltipTypeProps } from "../component/ui/Tooltip";
import CodeView from "./CodeView";

const TooltipPage = (props: TooltipTypeProps) => {
  return (
    <div>
      <CodeView
        code={`
<Tooltip {...props} content={"Đây là kết quả"}>
    Hover vào đây
</Tooltip>
      `}
      />
    </div>
  );
};

export default TooltipPage;
