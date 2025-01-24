import React from "react";
import styles from "./Content.module.css";

export interface ContentProps {
  children: React.ReactNode;
  padding?: string;
  className?: string;
}

const Content: React.FC<ContentProps> = ({
  children,
  padding = "0px",
  className = "",
}) => {
  return (
    <main className={styles.content + " " + className} style={{ padding }}>
      {children}
    </main>
  );
};

export default Content;
