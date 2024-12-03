import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./dropdown.module.css";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import classNames from "classnames"; // Ensure this is imported

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
    const [selected, setSelected] = useState(selectedValue);

    const dropdownWrapperClass = `${styles.dropdownWrapper} ${styles[variant]}`;
    const dropdownToggleClass = `${styles.dropdownToggle}`;
    // Merge styles with Tailwind using classNames
    const dropdownMenuClass = classNames(
        styles.dropdownMenu, // Module class
        "bg-cardBg dark:bg-darkCardBg shadow-lg" // Tailwind classes
    );

    const handleToggle = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setSelected(option);
        if (onChange) onChange(option);
        setIsOpen(false);
    };

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
            <div className={dropdownToggleClass} onClick={handleToggle}>
                <div className={styles.selectedValue}>
                    {selected || <span className={styles.placeholder}>{placeholder}</span>}
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
                <ul className={dropdownMenuClass}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={styles.dropdownOption}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    labelFor: PropTypes.node,
    labelName: PropTypes.node,
    variant: PropTypes.oneOf(["primary", "success", "danger"]),
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
    selectedValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Dropdown;
