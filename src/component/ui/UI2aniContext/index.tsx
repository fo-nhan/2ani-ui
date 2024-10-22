"use client";

import React, { Context, createContext } from "react";

export type StateThemeProps = {
  key?: "light" | "dark" | (string & {});
  backgroundColor?: string;
  backgroundColorClass?: string;
  textColor?: string;
  textColorClass?: string;
  skeleton?: string;
  skeletonClass?: string;
  boxShadow?: string;
  boxShadowClass?: string;
  bodyBackgroundColor?: string;
  bodyBackgroundColorClass?: string;
  fontFamily?: string;
  fontFamilyClass?: string;
  buttonClass?: {
    primary: string;
    secondary: string;
    info: string;
    warning: string;
    violet: string;
    sunny: string;
    pink: string;
    default: string;
    white: string;
    black: string;
  };
  [key: string]: any;
};

export type StateContextProps = Context<{
  theme: StateThemeProps;
  setTheme: (key?: "light" | "dark" | (string & {})) => void;
}>;

export const reState: StateContextProps = createContext({
  setTheme: () => {},
  theme: {},
});

function UI2aniContext({
  children,
  configTheme = {},
  defaultThemeKey = "light",
  configDarkTheme = {},
  configLightTheme = {},
  style = {},
}: {
  children: React.ReactNode;
  configTheme?: {
    [key: "light" | "dark" | string]: StateThemeProps;
  };
  defaultThemeKey?: "light" | "dark" | (string & {});
  configLightTheme?: StateThemeProps;
  configDarkTheme?: StateThemeProps;
  style?: React.CSSProperties;
}) {
  const defaultTheme: { [key: "light" | "dark" | string]: StateThemeProps } = {
    ...configTheme,
    light: {
      backgroundColor: "rgb(255, 255, 255)",
      backgroundColorClass: "UI-2ANI-backgroundColor--light",
      textColor: "rgba(0, 0, 0, 0.938)",
      textColorClass: "UI-2ANI-textColor--light",
      boxShadow: "rgba(0, 0, 0, 0.027)",
      skeletonClass: "UI-2ANI-skeleton--light",
      bodyBackgroundColor: "rgb(240 242 245 / 67%)",
      bodyBackgroundColorClass: "UI-2ANI-bodyBackgroundColor--light",
      fontFamily: `"Segoe UI", "San Francisco", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`,
      fontFamilyClass: "UI-2ANI-font",
      buttonClass: {
        primary: "UI-2ANI-primary",
        secondary: "UI-2ANI-secondary",
        info: "UI-2ANI-info",
        warning: "UI-2ANI-warning",
        violet: "UI-2ANI-violet",
        sunny: "UI-2ANI-sunny",
        pink: "UI-2ANI-pink",
        default: "UI-2ANI-default",
        white: "UI-2ANI-white",
        black: "UI-2ANI-black",
      },
      ...configLightTheme,
    },
    dark: {
      backgroundColor: "rgb(36, 37, 38)",
      backgroundColorClass: "UI-2ANI-backgroundColor--dark",
      textColor: "rgb(243, 243, 243)",
      textColorClass: "UI-2ANI-textColor--dark",
      boxShadow: "rgb(120 120 120 / 55%)",
      skeletonClass: "UI-2ANI-skeleton--dark",
      bodyBackgroundColor: "rgb(21, 21, 21)",
      bodyBackgroundColorClass: "UI-2ANI-bodyBackgroundColor--dark",
      fontFamily: `"Segoe UI", "San Francisco", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`,
      fontFamilyClass: "UI-2ANI-font",
      buttonClass: {
        primary: "UI-2ANI-primary",
        secondary: "UI-2ANI-secondary",
        info: "UI-2ANI-info",
        warning: "UI-2ANI-warning",
        violet: "UI-2ANI-violet",
        sunny: "UI-2ANI-sunny",
        pink: "UI-2ANI-pink",
        default: "UI-2ANI-default",
        white: "UI-2ANI-white",
        black: "UI-2ANI-black",
      },
      ...configDarkTheme,
    },
  } as const;

  const [theme, setTheme] = React.useState({
    key: defaultThemeKey,
    ...defaultTheme[defaultThemeKey],
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        ...style,
      }}
      className={`${theme.bodyBackgroundColorClass} ${theme.textColorClass} ${theme.fontFamilyClass}`}
      id="root-ui"
    >
      <reState.Provider
        value={{
          theme,
          setTheme: (key: "light" | "dark" | (string & {}) | undefined) =>
            setTheme({
              key: key || defaultThemeKey,
              ...defaultTheme[key || defaultThemeKey || "light"],
            }),
        }}
      >
        {children}
      </reState.Provider>
      <div id="__alert"></div>
      <div id="__modal"></div>
      <div id="__tooltip"></div>
      <div
        id="__menu_color"
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
          boxShadow: theme.boxShadow,
        }}
      ></div>
    </div>
  );
}

export default UI2aniContext;
