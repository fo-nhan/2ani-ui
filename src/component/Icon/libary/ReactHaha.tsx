import React from "react";

const ReactHaha = (props: any) => {
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
          id="react-icon-haha-a"
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
          id="react-icon-haha-b"
          x1="24"
          x2="24"
          y1="37.5"
          y2="21.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#8b3a0e" />
          <stop offset="1" stopColor="#472315" />
        </linearGradient>
        <linearGradient
          id="react-icon-haha-c"
          x1="24.009"
          x2="24.009"
          y1="37.5"
          y2="30.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d91f3a" />
          <stop offset="1" stopColor="#f85874" />
        </linearGradient>
        <linearGradient
          id="react-icon-haha-d"
          x1="24.001"
          x2="24.001"
          y1="19.5"
          y2="12.748"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".006" stopColor="#3c466e" />
          <stop offset="1" stopColor="#252949" />
        </linearGradient>
      </defs>
      <g>
        <path
          fill="url(#react-icon-haha-a)"
          d="M42 24c0 9.94-8.06 18-18 18S6 33.94 6 24 14.06 6 24 6s18 8.06 18 18"
        />
        <path
          fill="url(#react-icon-haha-b)"
          d="M12.75 24.018C12.75 28.552 15.018 37.5 24 37.5s11.25-8.948 11.25-13.482c0-.36-3.62-2.268-11.25-2.268s-11.25 1.908-11.25 2.268z"
        />
        <path
          fill="url(#react-icon-haha-c)"
          d="M16.213 34.125c1.811 2.24 4.297 3.375 7.814 3.375 3.514 0 5.967-1.134 7.778-3.375-1.24-1.327-3.595-3.375-7.778-3.375-4.194 0-6.566 2.047-7.814 3.375z"
        />
        <path
          fill="url(#react-icon-haha-d)"
          d="M19.984 15.326c.59.421 1.125 1.02.913 1.775-.157.572-.43.826-.95.826-1.748.025-3.84.58-5.633 1.38-.149.07-.448.202-.747.193-.282-.009-.563-.133-.738-.535-.149-.354-.158-.871.623-1.346 1.222-.738 2.83-1.08 4.3-1.354a15.753 15.753 0 0 0-2.963-1.73c-.96-.44-.853-1.029-.73-1.355.29-.711 1.37-.439 2.426.063 1.23.571 2.4 1.273 3.499 2.084zm8.041 0c1.09-.81 2.26-1.512 3.49-2.083 1.055-.502 2.135-.774 2.425-.063.133.326.237.915-.729 1.354a15.62 15.62 0 0 0-2.954 1.73c1.47.275 3.07.617 4.291 1.355.79.475.772.992.623 1.345-.175.403-.457.527-.738.536-.299.009-.598-.124-.747-.194-1.793-.798-3.876-1.345-5.634-1.37-.51-.009-.792-.263-.95-.835-.202-.747.334-1.354.923-1.775z"
        />
      </g>
    </svg>
  );
};

export default ReactHaha;
