import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./select.module.css";
import incomeImg from "../../../assets/img/income-img.svg";
import expenseImg from "../../../assets/img/expense-img.svg";

const CardSelect = ({ name, onChange }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    setSelected(value);
    onChange(value);
  };

  const options = [
    {
      label: "Income",
      value: "income",
      image: incomeImg,
      bgColor: "#D2F091",
    },
    {
      label: "Expense",
      value: "expense",
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
  name: PropTypes.string.isRequired, // Name for the radio input group
  onChange: PropTypes.func.isRequired, // Callback when a selection is made
};

export default CardSelect;
