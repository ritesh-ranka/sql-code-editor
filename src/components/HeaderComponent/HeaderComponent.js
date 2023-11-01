import React, { memo } from "react";

import styles from "./headerComponent.module.scss";

const HeaderComponent = () => {
  return (
    <div className={styles.navbar}>
      <h1>SQL Lite</h1>
    </div>
  );
};

export default memo(HeaderComponent);
