import React from "react";
import PropTypes from "prop-types";
import styles from "./table.module.css";

const Table = ({
  columns,
  data,
  variant = "primary",
  actions,
  tailwindClass = "",
}) => {
  const tableClass = `${styles.table} ${styles[variant]} ${tailwindClass}`;

  return (
    <div className={styles.tableContainer}>
      <table className={tableClass}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
              {actions && (
                <td>
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(row)}
                      className={`${styles.actionButton} ${
                        styles[action.type]
                      }`}
                    >
                      {action.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      type: PropTypes.oneOf(["edit", "delete"]).isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
  tailwindClass: PropTypes.string,
};

export default Table;
