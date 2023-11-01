import React, { memo, useState } from "react";

import { Divider, Button } from "antd";

import Editor from "./components/Editor";
import ResultArea from "./components/ResultArea";
import styles from "./editorSection.module.scss";
import { executeSQLQuery } from "../../helpers/queryHelpers";
import { EMPTY_ARRAY, EMPTY_STRING } from "../../constants/constants";

const EditorSection = (props) => {
  const [outputValue, setOutputValue] = useState({
    data: EMPTY_ARRAY,
    message: EMPTY_STRING,
  });

  const query = "delete from products where type = 'Electronics'";
  const executeQuery = () => {
    const result = executeSQLQuery(query);
    console.log(result);
    setOutputValue(result);
  };
  return (
    <div className={styles.editorSection}>
      <Editor></Editor>
      <div
        style={{
          justifyContent: "right",
          display: "flex",
          margin: "0.4rem 0rem",
        }}
      >
        <Button className={styles.customButton} style={{ marginRight: "1rem" }}>
          Clear
        </Button>
        <Button
          className={styles.customButton}
          style={{
            backgroundColor: "black",
            color: "white",
            marginRight: "1rem",
          }}
          onClick={executeQuery}
        >
          Run
        </Button>
      </div>
      <Divider
        style={{ margin: "0rem 0rem 0.4rem 0rem", backgroundColor: "black" }}
      ></Divider>
      <ResultArea
        data={outputValue.data}
        message={outputValue.message}
      ></ResultArea>
    </div>
  );
};

export default memo(EditorSection);
