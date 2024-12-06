import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import styles from "./datePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "iconsax-react";

const DatePicker = ({
    labelFor,
    labelName,
    variant = "primary",
    selectedDate,
    onChange,
    placeholder = "Select Date",
}) => {
    const [date, setDate] = useState(selectedDate);

    // Sync internal state when selectedDate changes
    useEffect(() => {
        setDate(selectedDate);
    }, [selectedDate]);

    const handleChange = (newDate) => {
        setDate(newDate); // Update internal state
        if (onChange) onChange(newDate); // Notify parent
    };

    // Apply dynamic styling
    const datePickerWrapperClass = `${styles.datePickerWrapper} ${styles[variant]}`;
    const datePickerInputClass = `${styles.datePickerInput}`;

    return (
        <div className={datePickerWrapperClass}>
            {labelName && (
                <label
                    htmlFor={labelFor}
                    className="text-textColor dark:text-darkTextColor"
                >
                    {labelName}
                </label>
            )}
            <ReactDatePicker
                id={labelFor}
                selected={date} // Use internal state
                onChange={handleChange}
                dateFormat="yyyy-MM-dd"
                placeholderText={placeholder}
                customInput={
                    <div className={datePickerInputClass}>
                        <input
                            type="text"
                            value={date ? date.toISOString().split("T")[0] : ""}
                            readOnly
                            placeholder={placeholder}
                            className={`${styles.customInput} bg-cardBg dark:bg-darkCardBg text-textColor dark:text-darkTextColor rounded-lg w-full p-2 cursor-pointer`}
                        />
                        <Calendar className="ml-2 text-textColor dark:text-darkTextColor calendarIcon" size="20" />
                    </div>
                }
                calendarClassName={styles.calendar}
                wrapperClassName={styles.wrapper}
                popperClassName={styles.popper}
            />
        </div>
    );
};

DatePicker.propTypes = {
    labelFor: PropTypes.node,
    labelName: PropTypes.node,
    variant: PropTypes.oneOf(["primary", "success", "danger"]),
    selectedDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default DatePicker;
