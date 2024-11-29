import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./select.module.css";
import incomeImg from "../../../assets/img/income-img.svg";
import expenseImg from "../../../assets/img/expense-img.svg";

const CardSelect = ({ name, onChange, defaultValue }) => {
  const [selected, setSelected] = useState(defaultValue || null);

  useEffect(() => {
    if (defaultValue && selected !== defaultValue) {
      setSelected(defaultValue);
      onChange(defaultValue); // Trigger onChange for default value
    }
  }, [defaultValue, selected, onChange]);

  const handleSelect = (value) => {
    setSelected(value);
    onChange(value);
  };

  const options = [
    {
      label: "Income",
      value: "INCOME",
      image: incomeImg,
      bgColor: "#D2F091",
    },
    {
      label: "Expense",
      value: "EXPENSE",
      image: expenseImg,
      bgColor: "#FCECBF",
    },
  ];

  return (
    <div className={styles.cardContainer}>
      {options.map((option, index) => (
        <label
          key={index}
          className={`${styles.card} ${
            selected === option.value ? styles.selected : ""
          }`}
          style={{
            backgroundColor:
              selected === option.value ? option.bgColor : "transparent",
          }}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleSelect(option.value)}
            className={styles.radioInput}
          />
          <div className={styles.cardContent}>
            <img
              src={option.image}
              alt={option.label}
              className={styles.cardImage}
            />
            <span className={styles.cardLabel}>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

CardSelect.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default CardSelect;
