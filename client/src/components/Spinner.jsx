import React from "react";

import styles from "./css/Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["circle"]}></div>
      <div className={styles["circle"]}></div>
      <div className={styles["circle"]}></div>
      <div className={styles["shadow"]}></div>
      <div className={styles["shadow"]}></div>
      <div className={styles["shadow"]}></div>
    </div>
  );
};

export default Spinner;
