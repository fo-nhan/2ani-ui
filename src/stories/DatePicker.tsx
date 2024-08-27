import React from "react";
import { DatePicker as DatePickerPage, UI2aniContext } from "../component";
import { DatePickerTypeProps } from "../component/ui/DatePicker";

const DatePicker = (props: DatePickerTypeProps) => {
  return (
    <UI2aniContext
      style={{
        width: "100%",
        background: "white",
        minHeight: "200px",
      }}
    >
      <div style={{ height: 400 }}>
        <DatePickerPage {...props} />
      </div>
    </UI2aniContext>
  );
};

export default DatePicker;
