import React, { ReactNode, useEffect, useState } from "react";
import styles from "./Footer.module.css";

export interface FooterProps {
  children: React.ReactNode;
  hiddenPaths?: string[];
  height?: number;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  children,
  hiddenPaths = [],
  height = 150,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      const currentPath = window.location.pathname;
      setIsVisible(!hiddenPaths.includes(currentPath));
    };

    checkVisibility();
    window.addEventListener("popstate", checkVisibility);

    return () => {
      window.removeEventListener("popstate", checkVisibility);
    };
  }, [hiddenPaths]);

  if (!isVisible) return null;

  return (
    <footer style={{ height }} className={styles.footer + " " + className}>
      {children}
    </footer>
  );
};

export default Footer;
