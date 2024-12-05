import PropTypes from "prop-types";
import styles from "./inputTextarea.module.css";

const InputTextarea = ({
  labelFor,
  type = "textarea",
  labelName,
  variant = "primary",
  inputId,
  inputName,
  placeholder,
  value,
  onChange,
}) => {
  const inputTextareaClass = `${styles.inputTextarea} ${styles[variant]}`;

  return (
    <div className={inputTextareaClass}>
      <label
        htmlFor={labelFor}
        className="text-textColor dark:text-darkTextColor"
      >
        {labelName}
      </label>
      <textarea
        type={type}
        id={inputId}
        name={inputName}
        placeholder={placeholder}
        rows="4"
        value={value} // Controlled component
        onChange={onChange} // Pass changes to parent
        className="w-full p-2 border rounded-md" // Example styling
      />
    </div>
  );
};

InputTextarea.propTypes = {
  labelFor: PropTypes.string,
  type: PropTypes.oneOf(["textarea"]),
  labelName: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  inputId: PropTypes.string,
  inputName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired, // Controlled value
  onChange: PropTypes.func.isRequired, // onChange handler
};

export default InputTextarea;
