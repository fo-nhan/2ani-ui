import React from "react";

const ReactSad = (props: any) => {
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
          id="react-icon-sad-b"
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
          id="react-icon-sad-c"
          x1="24"
          x2="24"
          y1="35.25"
          y2="30.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#8b3a0e" />
          <stop offset="1" stopColor="#472315" />
        </linearGradient>
        <linearGradient
          id="react-icon-sad-a"
          x1="16.648"
          x2="16.648"
          y1="28.5"
          y2="22.506"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".006" stopColor="#3c466e" />
          <stop offset="1" stopColor="#252949" />
        </linearGradient>
        <linearGradient
          xlinkHref="#react-icon-sad-a"
          id="react-icon-sad-d"
          x1="31.347"
          x2="31.347"
          y1="28.495"
        />
        <linearGradient
          id="react-icon-sad-e"
          x1="36.422"
          x2="36.422"
          y1="42"
          y2="30.269"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".006" stopColor="#35cafc" />
          <stop offset="1" stopColor="#007edb" />
        </linearGradient>
        <linearGradient
          id="react-icon-sad-f"
          x1="36.422"
          x2="36.422"
          y1="35.886"
          y2="31.065"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#007edb" />
        </linearGradient>
      </defs>
      <g>
        <path
          fill="url(#react-icon-sad-b)"
          d="M42 24c0 9.94-8.06 18-18 18S6 33.94 6 24 14.06 6 24 6s18 8.06 18 18"
        />
        <path
          fill="url(#react-icon-sad-c)"
          d="M17.997 34.724c0 .306.211.526.562.526.792 0 1.881-1.406 5.441-1.406s4.649 1.406 5.44 1.406c.351 0 .563-.22.563-.526 0-.898-1.89-3.974-6.003-3.974s-6.003 3.076-6.003 3.974z"
        />
        <path
          fill="url(#react-icon-sad-a)"
          d="M14.095 25.802c0-1.829 1.15-3.296 2.556-3.296s2.55 1.467 2.55 3.296c0 .756-.203 1.458-.536 2.02-.15.248-.396.433-.677.502a5.189 5.189 0 0 1-2.68 0 1.067 1.067 0 0 1-.668-.501 3.898 3.898 0 0 1-.544-2.02z"
        />
        <path
          fill="url(#react-icon-sad-a)"
          d="M28.8 25.802c0-1.829 1.142-3.296 2.548-3.296 1.416 0 2.547 1.467 2.547 3.296 0 .756-.2 1.458-.535 2.02a1.085 1.085 0 0 1-.677.502 5.317 5.317 0 0 1-2.67 0 1.115 1.115 0 0 1-.678-.501 3.887 3.887 0 0 1-.536-2.02z"
        />
        <path
          fill="#de8009"
          d="M30.65 17.976a8.762 8.762 0 0 1 5.645 2.82c.49.522.863 1.153 1.143 1.796a.533.533 0 0 1-.275.702.544.544 0 0 1-.593-.111c-.486-.396-.922-.786-1.424-1.1-1.475-.992-3.17-1.574-4.87-2.054-1.194-.37-.864-2.13.374-2.053zM17.796 20.06c-2.264.611-4.434 1.524-6.192 3.123-.417.408-1.102-.058-.869-.591 1.058-2.48 3.623-4.098 6.218-4.551a6.01 6.01 0 0 1 .57-.065 1.05 1.05 0 0 1 1.124.97 1.063 1.063 0 0 1-.851 1.113z"
        />
        <path
          fill="url(#react-icon-sad-e)"
          d="M36.422 30.269s-3.483 4.843-3.483 8.248a3.483 3.483 0 1 0 6.966 0c0-3.405-3.483-8.248-3.483-8.248z"
        />
        <path
          fill="url(#react-icon-sad-f)"
          d="M36.422 31.065s-1.431 1.99-1.431 3.39a1.431 1.431 0 0 0 2.862 0c0-1.4-1.431-3.39-1.431-3.39z"
        />
      </g>
    </svg>
  );
};

export default ReactSad;
