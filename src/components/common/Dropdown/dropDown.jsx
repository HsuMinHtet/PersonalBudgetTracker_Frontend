import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./dropdown.module.css";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import classNames from "classnames";

const Dropdown = ({
  labelFor,
  labelName,
  variant = "primary",
  options,
  placeholder = "Select an option",
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  // Update the selected label when selectedValue changes
  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    setSelectedLabel(selectedOption ? selectedOption.label : ""); // Set label for selected ID
  }, [selectedValue, options]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value) => {
    const selectedOption = options.find((option) => option.value === value);
    setSelectedLabel(selectedOption.label); // Update label for selected option
    if (onChange) onChange(value); // Pass the value (ID) to parent
    setIsOpen(false);
  };

  const dropdownWrapperClass = `${styles.dropdownWrapper} ${styles[variant]}`;
  const dropdownToggleClass = `${styles.dropdownToggle}`;
  const dropdownMenuClass = classNames(
    styles.dropdownMenu,
    "bg-cardBg dark:bg-darkCardBg shadow-lg"
  );

  return (
    <div className={dropdownWrapperClass}>
      {labelName && (
        <label
          htmlFor={labelFor}
          className="text-textColor dark:text-darkTextColor"
        >
          {labelName}
        </label>
      )}
      <div
        id={labelFor}
        role="button"
        tabIndex="0"
        className={dropdownToggleClass}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className={styles.selectedValue}>
          {selectedLabel || (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>
        <div className={styles.toggleIcon}>
          {isOpen ? (
            <ArrowUp2 className="text-gray-500" size="20" />
          ) : (
            <ArrowDown2 className="text-gray-500" size="20" />
          )}
        </div>
      </div>
      {isOpen && (
        <ul className={dropdownMenuClass} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={selectedValue === option.value}
              className={styles.dropdownOption}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  labelFor: PropTypes.string,
  labelName: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "success", "danger"]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  selectedValue: PropTypes.any, // The selected ID
  onChange: PropTypes.func.isRequired, // Function to handle selection
};

export default Dropdown;
