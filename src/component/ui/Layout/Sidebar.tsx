import React from "react";
import styles from "./Sidebar.module.css";

export interface SidebarProps {
  children: React.ReactNode;
  position?: "fixed" | "static" | "sticky";
  side?: "left" | "right";
  width?: string;
  left?: number;
  right?: number;
  top?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  position = "static",
  side = "left",
  width = "250px",
  right = 0,
  left = 0,
  top = 50,
}) => {
  return (
    <aside
      className={`${styles.sidebar} ${styles[position]}`}
      style={{
        width,
        top,
        height: `calc(100vh - ${top}px)`,
        ...(side === "left" ? { left } : { right }),
      }}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
