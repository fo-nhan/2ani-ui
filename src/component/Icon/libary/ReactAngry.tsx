import React from "react";

const ReactAngry = (props: any) => {
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
          id="react-icon-angry-b"
          cx="24.072"
          cy="13.359"
          r="25.433"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".006" stopColor="#f16b1f" />
          <stop offset=".348" stopColor="#f0681e" />
          <stop offset=".568" stopColor="#ed5f1d" />
          <stop offset=".754" stopColor="#e7501b" />
          <stop offset=".92" stopColor="#e03c19" />
          <stop offset="1" stopColor="#dc2f18" />
        </radialGradient>
        <linearGradient
          id="react-icon-angry-c"
          x1="24.081"
          x2="24.081"
          y1="37.194"
          y2="33.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#8b3a0e" />
          <stop offset="1" stopColor="#472315" />
        </linearGradient>
        <linearGradient
          id="react-icon-angry-a"
          x1="31.1"
          x2="31.1"
          y1="24.714"
          y2="30.191"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".006" stopColor="#3c466e" />
          <stop offset="1" stopColor="#252949" />
        </linearGradient>
        <linearGradient
          xlinkHref="#react-icon-angry-a"
          id="react-icon-angry-d"
          x1="16.936"
          x2="16.936"
        />
      </defs>
      <g>
        <path
          fill="url(#react-icon-angry-b)"
          d="M42 24c0 9.94-8.06 18-18 18S6 33.94 6 24 14.06 6 24 6s18 8.06 18 18"
        />
        <path
          fill="url(#react-icon-angry-c)"
          d="M30.4 35.623c-.822-.547-2.968-1.713-6.32-1.713s-5.497 1.166-6.32 1.713a.858.858 0 0 0 .478 1.57h11.685a.858.858 0 0 0 .478-1.57z"
        />
        <path
          fill="url(#react-icon-angry-a)"
          d="M28.642 27.605c0-1.628 1.1-2.95 2.458-2.95s2.458 1.322 2.458 2.95-1.1 2.95-2.458 2.95-2.458-1.322-2.458-2.95z"
        />
        <path
          fill="url(#react-icon-angry-a)"
          d="M14.479 27.605c0-1.628 1.099-2.95 2.457-2.95s2.458 1.322 2.458 2.95-1.099 2.95-2.458 2.95-2.457-1.322-2.457-2.95z"
        />
        <g fill="#c64200">
          <path d="M28.18 22.253c.103.566.248 1.644.401 2.176.015.062.056.132.004.05a.88.88 0 0 0-.187-.193c-.021-.017-.06-.04-.05-.035l-.007-.005c-.012-.006-.021-.005-.01-.003.02.014.062.022.104.03 1.445.108 2.916-.405 4.374-.7.913-.208 1.827-.436 2.816-.554a.53.53 0 0 1 .262 1.017c-.825.37-1.681.776-2.555 1.143-1.68.642-4.355 1.898-6.126.987a1.417 1.417 0 0 1-.498-.467c-.573-1.066-.57-2.133-.623-3.285.021-1.294 1.881-1.428 2.094-.161zM21.91 22.414c-.053 1.153-.05 2.218-.623 3.285-.067.093-.118.172-.226.27-1.027.847-2.534.483-3.66.194-1.861-.52-3.578-1.353-5.293-2.127a.53.53 0 0 1 .262-1.017c.99.118 1.903.346 2.816.554 1.48.29 2.98.845 4.444.683.021-.005.035-.01.034-.013.011-.002.002-.003-.01.003-.018.014-.097.066-.127.099-.069.07-.071.072-.117.134-.052.082-.01.013.004-.05.154-.534.301-1.623.404-2.189.231-1.265 2.077-1.103 2.092.174z" />
        </g>
      </g>
    </svg>
  );
};

export default ReactAngry;
