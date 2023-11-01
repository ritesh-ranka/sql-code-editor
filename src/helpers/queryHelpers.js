import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _set from "lodash/set";
import _toString from "lodash/toString";
import _filter from "lodash/filter";
import _difference from "lodash/difference";

import { EMPTY_ARRAY, TABLE_NAMES_VS_DATA } from "../constants/constants";

const getTableData = (tableName) => {
  const data = TABLE_NAMES_VS_DATA[tableName];
  return data;
};

const getFilteredDataAfterWhereClause = (condition, data) => {
  const conditionParts = condition.match(/([^\s]+) ([=<>!]+) (.+)/i);
  if (!conditionParts) {
    throw new Error('Invalid SQL query: Unable to parse the "WHERE" clause');
  }
  const field = conditionParts[1];
  const operator = conditionParts[2];
  let value = conditionParts[3];

  if (value.startsWith("'") && value.endsWith("'")) {
    value = value.substring(1, value.length - 1);
  } else value = Number(value);

  let filteredData = data;

  switch (operator) {
    case "=":
      filteredData = _filter(
        filteredData,
        (item) => item[field].toLowerCase() === value
      );
      break;
    case ">":
      filteredData = _filter(
        filteredData,
        (item) => item[field].toLowerCase() > value
      );
      break;
    case ">=":
      filteredData = _filter(
        filteredData,
        (item) => item[field].toLowerCase() >= value
      );
      break;
    case "<":
      filteredData = _filter(
        filteredData,
        (item) => item[field].toLowerCase() < value
      );
      break;
    case "<=":
      filteredData = _filter(
        filteredData,
        (item) => item[field].toLowerCase() <= value
      );
      break;
    case "!=":
      filteredData = _filter(
        filteredData,
        (item) => item[field].toLowerCase() !== value
      );
      break;
    default:
      throw new Error(`Ivalid operator ${operator}`);
  }
  return filteredData;
};

export const executeSelectQuery = (query) => {
  query = query.toLowerCase();

  const fromMatch = query.match(/from ([^\s]+)/i);
  const whereMatch = query.match(/where (.+)/i);
  const selectMatch = query.match(/select (.+) from/i);

  if (!fromMatch) {
    return {
      data: EMPTY_ARRAY,
      message: 'Invalid SQL query: Missing "FROM" clause',
    };
  }

  let tableName = fromMatch[1].trim();
  let filteredData = getTableData(tableName);

  if (whereMatch) {
    const condition = whereMatch[1];
    try {
      filteredData = getFilteredDataAfterWhereClause(condition, filteredData);
    } catch (e) {
      return { data: EMPTY_ARRAY, message: e.message };
    }
  }

  if (selectMatch) {
    const selectColumns = selectMatch[1]
      .split(",")
      .map((column) => column.trim());
    if (selectColumns.length > 0 && selectColumns[0] !== "*") {
      filteredData = filteredData.map((item) => {
        const selectedData = {};
        selectColumns.forEach((column) => {
          selectedData[column] = item[column];
        });
        return selectedData;
      });
    }
  }

  if (_isEmpty(filteredData)) {
    return { data: EMPTY_ARRAY, message: "No rows found!" };
  }
  return { data: filteredData, message: "Query executed successfully." };
};

export const executeUpdateQuery = (query) => {
  query = query.toLowerCase();

  const fromMatch = query.match(/from ([^\s]+)/i);
  const whereMatch = query.match(/where (.+)/i);
  let setMatch = query.match(/set (.+)/i);
  if (whereMatch) {
    setMatch = query.match(/set (.+) where/i);
  }

  if (!fromMatch) {
    return {
      data: EMPTY_ARRAY,
      message: 'Invalid SQL query: Missing "FROM" clause',
    };
  }

  const tableName = fromMatch[1].trim();
  let filteredData = getTableData(tableName);

  if (!setMatch) {
    return {
      data: EMPTY_ARRAY,
      message: 'Invalid SQL query: Missing "SET" clause',
    };
  }

  if (whereMatch) {
    try {
      filteredData = getFilteredDataAfterWhereClause(
        whereMatch[1],
        filteredData
      );
    } catch (e) {
      return { data: EMPTY_ARRAY, message: e.message };
    }
  }

  const setMatchSplit = _toString(setMatch).split(" ");

  const updatedData = _map(filteredData, (data) => {
    return _set(
      data,
      `${setMatchSplit[1]}`,
      setMatchSplit[setMatchSplit.length - 1]
    );
  });

  return { data: updatedData, message: "Query executed successfully" };
};

export const executeDeleteQuery = (query) => {
  query = query.toLowerCase();

  const fromMatch = query.match(/from ([^\s]+)/i);
  const whereMatch = query.match(/where (.+)/i);

  if (!fromMatch) {
    return {
      data: EMPTY_ARRAY,
      message: 'Invalid SQL query: Missing "FROM" clause',
    };
  }

  const tableName = fromMatch[1].trim();
  const data = getTableData(tableName);

  if (!whereMatch) {
    return { data: EMPTY_ARRAY, message: "Table dropped successfully" };
  }

  let filteredData = data;
  try {
    filteredData = getFilteredDataAfterWhereClause(whereMatch[1], data);
  } catch (e) {
    return { data: EMPTY_ARRAY, message: e.message };
  }

  return {
    data: _difference(data, filteredData),
    message: "Query executed successsfully",
  };
};

export const executeSQLQuery = (query) => {
  query = query.toLowerCase();
  const selectMatch = query.match(/select ([^\s]+)/i);
  const updateMatch = query.match(/update ([^\s]+)/i);
  const deleteMatch = query.match(/delete ([^\s]+)/i);

  if (selectMatch) {
    return executeSelectQuery(query);
  }

  if (updateMatch) {
    return executeUpdateQuery(query);
  }

  if (deleteMatch) {
    return executeDeleteQuery(query);
  }

  return {
    data: EMPTY_ARRAY,
    message: 'Invalid Query. Use "SELECT", "UPDATE" or "DELETE" statements.',
  };
};
