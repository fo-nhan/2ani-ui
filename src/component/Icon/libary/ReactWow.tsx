import React from "react";

const ReactWow = (props: any) => {
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
        <radialGradient
          id="react-icon-wow-b"
          cx="24.072"
          cy="13.359"
          r="25.433"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".006" stopColor="#feeb72" />
          <stop offset=".316" stopColor="#fde86f" />
          <stop offset=".515" stopColor="#fcdf68" />
          <stop offset=".684" stopColor="#fbd05c" />
          <stop offset=".835" stopColor="#f9bb4b" />
          <stop offset=".974" stopColor="#f6a134" />
          <stop offset="1" stopColor="#f69b30" />
        </radialGradient>
        <linearGradient
          id="react-icon-wow-c"
          x1="24"
          x2="24"
          y1="37.5"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#8b3a0e" />
          <stop offset="1" stopColor="#472315" />
        </linearGradient>
        <linearGradient
          id="react-icon-wow-a"
          x1="16.688"
          x2="16.688"
          y1="14.934"
          y2="21.925"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".006" stopColor="#3c466e" />
          <stop offset="1" stopColor="#252949" />
        </linearGradient>
        <linearGradient
          id="react-icon-wow-d"
          x1="31.313"
          x2="31.313"
          y1="15.066"
          y2="21.334"
          xlinkHref="#react-icon-wow-a"
        />
      </defs>
      <g>
        <path
          fill="url(#react-icon-wow-b)"
          d="M42 24c0 9.94-8.06 18-18 18S6 33.94 6 24 14.06 6 24 6s18 8.06 18 18"
        />
        <path
          fill="url(#react-icon-wow-c)"
          d="M18.701 30.496C18.34 34.652 20.335 37.5 24 37.5s5.661-2.849 5.299-7.004C28.948 26.346 26.795 24 24 24s-4.948 2.347-5.299 6.496z"
        />
        <path
          fill="url(#react-icon-wow-a)"
          d="M13.875 18.375c0-1.863 1.258-3.375 2.812-3.375s2.813 1.512 2.813 3.375-1.258 3.375-2.813 3.375-2.812-1.512-2.812-3.375z"
        />
        <path
          fill="url(#react-icon-wow-a)"
          d="M28.5 18.375c0-1.863 1.258-3.375 2.813-3.375s2.812 1.512 2.812 3.375-1.258 3.375-2.812 3.375-2.813-1.512-2.813-3.375z"
        />
        <g fill="#de8009">
          <path d="M26.554 14.053c2.469-3.49 8.134-2.917 9.588 1.182.214.62-.674.991-.965.406-.607-1.308-1.98-2.301-3.448-2.309-1.384-.066-2.699.644-3.376 1.806-.744 1.167-2.485.12-1.8-1.085zM21.42 14.053c-2.47-3.49-8.135-2.917-9.589 1.182-.214.62.675.991.965.406.608-1.308 1.981-2.301 3.448-2.309 1.385-.066 2.7.644 3.377 1.806.743 1.167 2.485.12 1.799-1.085z" />
        </g>
      </g>
    </svg>
  );
};

export default ReactWow;
