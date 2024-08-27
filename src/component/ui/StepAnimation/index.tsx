import React from "react";
import styles from "./styles.module.css";

const StepAnimation = ({
  children,
  step,
  current,
}: {
  children: React.ReactNode;
  step: number;
  current: number;
}) => {
  return (
    <div
      className={`${styles.step} ${
        step === current ? styles.open : styles.close
      }`}
    >
      {children}
    </div>
  );
};

export default StepAnimation;
