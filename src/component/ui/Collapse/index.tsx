import React, { useState } from "react";
import styles from "./Collapse.module.css"; // Import CSS module
import Icon from "../../Icon";
import Box from "../Box";

export type CollapseTypeProps = {
  title?: string;
  customTittle?: React.ReactNode;
  children?: React.ReactNode;
};

const Collapse = ({ title, children, customTittle }: CollapseTypeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.collapseContainer}>
      <div className={styles.collapseButton} onClick={toggleCollapse}>
        {customTittle ? (
          customTittle
        ) : (
          <Box
            noCopy
            className={`${styles.title} ${isOpen ? "" : styles.titleClose}`}
          >
            <div className={styles.icon}>
              <Icon type="arrow-down" />
            </div>
            {title || ""}
          </Box>
        )}
      </div>
      <div
        className={`${styles.collapseContent} ${isOpen ? styles.open : styles.close}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapse;
