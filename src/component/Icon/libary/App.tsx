import React from "react";

const App = (props: any) => {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <rect width="112" height="112" x="48" y="48" rx="8" ry="8"></rect>
      <rect width="112" height="112" x="200" y="48" rx="8" ry="8"></rect>
      <rect width="112" height="112" x="352" y="48" rx="8" ry="8"></rect>
      <rect width="112" height="112" x="48" y="200" rx="8" ry="8"></rect>
      <rect width="112" height="112" x="200" y="200" rx="8" ry="8"></rect>
      <rect width="112" height="112" x="352" y="200" rx="8" ry="8"></rect>
      <rect width="112" height="112" x="48" y="352" rx="8" ry="8"></rect>
      <rect width="112" height="112" x="200" y="352" rx="8" ry="8"></rect>
      <rect width="112" height="112" x="352" y="352" rx="8" ry="8"></rect>
    </svg>
  );
};

export default App;
