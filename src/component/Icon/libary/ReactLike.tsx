import React from "react";

const ReactLike = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 48"
      xmlSpace="preserve"
      style={{ ...(props?.style ? props.style : {}) }}
    >
      <defs>
        <linearGradient
          id="react-icon-like-a"
          x1="24"
          x2="24"
          y1="42"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0064e1" />
          <stop offset=".994" stopColor="#26b7ff" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#react-icon-like-a)" />
      <g fill="#fff">
        <rect width="5.781" height="11.647" x="13.219" y="22.315" rx="1.839" />
        <path d="M35 24.556c0-.749-.332-1.411-.843-1.862.385-.388.624-.921.624-1.51a2.148 2.148 0 0 0-2.146-2.145h-3.678v-2.452c0-1.138-.316-2.085-.94-2.815a2.202 2.202 0 0 0-2.462-.629 2.27 2.27 0 0 0-1.502 2.143v3.14c0 1.694-2.41 3.276-3.34 3.743-.302.151-.49.858-.338 1.16v6.13l1.914 2.168a3.044 3.044 0 0 0 2.167.898h6.954a2.148 2.148 0 0 0 2.145-2.146c0-.166-.025-.328-.062-.487a2.138 2.138 0 0 0 .664-3.475c.511-.45.843-1.113.843-1.861z" />
      </g>
    </svg>
  );
};

export default ReactLike;
