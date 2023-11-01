import React, { memo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";

import styles from "./editor.module.scss";

const Editor = () => {
  const [content, setContent] = useState("");
  return (
    <div>
      <div className={styles.editorStyles}>
        <CodeMirror
          value={content}
          extensions={[sql()]}
          onChange={(value, viewUpdate) => {
            setContent(value);
          }}
        />
      </div>
    </div>
  );
};

export default memo(Editor);
