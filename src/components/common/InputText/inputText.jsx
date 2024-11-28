import PropTypes from "prop-types";
import styles from "./inputText.module.css";

const inputText = ({
  labelFor,
  type = "text",
  labelName,
  variant = "primary",
  inputId,
  inputName,
  placeholder,
  value,
  onChange,
  readOnly = false, // Default to false
}) => {
  const inputTextClass = `${styles.inputText} ${styles[variant]}`;

  return (
    <div className={inputTextClass}>
      <label
        htmlFor={labelFor}
        className="text-textColor dark:text-darkTextColor"
      >
        {labelName}
      </label>
      <input
        type={type}
        id={inputId}
        name={inputName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

inputText.propTypes = {
  labelFor: PropTypes.node,
  type: PropTypes.oneOf(["text", "password", "email", "number"]),
  labelName: PropTypes.node,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  inputId: PropTypes.node,
  inputName: PropTypes.node,
  placeholder: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default inputText;
