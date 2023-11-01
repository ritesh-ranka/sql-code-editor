import React, { useCallback } from "react";

import _map from "lodash/map";

import { Button, Divider } from "antd";
import { Content } from "antd/es/layout/layout";

import TABLE_NAMES from "../../constants/constants";
import styles from "./leftSection.module.scss";

const LeftSection = (props) => {
  const handleClick = useCallback((evt) => {}, []);

  return (
    <div className={styles.leftPanelStyles}>
      <div className={styles.containerStyles}>
        <h3 className={styles.headingStyles}>Tables</h3>
        <div className={styles.nameStyles}>
          {_map(TABLE_NAMES, (table, index) => {
            return (
              <div>
                <Button
                  style={{ padding: "0rem 0.4rem", margin: "0.2rem" }}
                  onClick={handleClick}
                  key={index}
                >
                  <Content key={index}>{`${table}`}</Content>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <Divider
        style={{ margin: "0rem 0rem 0.4rem 0rem", backgroundColor: "black" }}
      ></Divider>
      <div style={{ height: "20rem" }}>
        <h3 className={styles.headingStyles}>General Instructions</h3>
      </div>
    </div>
  );
};

export default LeftSection;
