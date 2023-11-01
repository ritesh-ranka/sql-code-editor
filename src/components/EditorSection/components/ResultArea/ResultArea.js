import React, { memo } from "react";

import _map from "lodash/map";

import { EMPTY_ARRAY, EMPTY_STRING } from "../../../../constants/constants";
import styles from "./resultArea.module.scss";

const ResultArea = (props) => {
  const { data = EMPTY_ARRAY, message = EMPTY_STRING } = props;

  if (data.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <p>{message}</p>
      </div>
    );
  }

  const tableHeadings = Object.keys(data[0]);

  return (
    <>
      <div className={styles.tableContainer}>
        <p>{message}</p>
        <table className={styles.customTable}>
          <thead>
            <tr>
              {_map(tableHeadings, (heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {_map(data, (row, index) => (
              <tr key={index}>
                {_map(tableHeadings, (heading) => (
                  <td key={heading}>{row[heading]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default memo(ResultArea);
