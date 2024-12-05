import React from "react";
import PropTypes from "prop-types";
import styles from "./table.module.css";

const Table = ({
  columns,
  data,
  variant = "primary",
  actions,
  tailwindClass = "",
  nodataImg = null,
  emptyMessage = "Oooops! There is no data. You can add one!",
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
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
                {actions && (
                  <td className="flex flex-row">
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
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className={styles.emptyState}
              >
                <div className={styles.emptyContainer}>
                  {nodataImg && (
                    <img
                      src={nodataImg}
                      alt="No Data"
                      className={styles.emptyImage}
                    />
                  )}
                  <p className="text-center text-xs opacity-50 p-10">
                    {emptyMessage}
                  </p>
                </div>
              </td>
            </tr>
          )}
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
  nodataImg: PropTypes.string,
  emptyMessage: PropTypes.string,
};

export default Table;
