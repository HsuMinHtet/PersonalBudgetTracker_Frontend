import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './inputPassword.module.css';
import { Eye, EyeSlash } from 'iconsax-react';

const inputPassword = ({ labelFor, labelName, variant = 'primary', inputId, inputName, placeholder, value, onChange }) => {

    const inputPasswordClass = `${styles.inputPassword} ${styles[variant]}`;
    const showHidePwdClass = `${styles.showHidePwd}`;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePassword = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <div className={inputPasswordClass}>
            <label htmlFor={labelFor} className="text-textColor dark:text-darkTextColor">{labelName}</label>
            <input type={isPasswordVisible ? 'text' : 'password'} id={inputId} name={inputName} placeholder={placeholder} value={value} onChange={onChange} />
            <div onClick={togglePassword} className={showHidePwdClass}>
                {isPasswordVisible ? (
                    <EyeSlash size="24" className="text-textColor dark:text-darkTextColor" title="Hide Password" />
                ) : (
                    <Eye size="24" className="text-textColor dark:text-darkTextColor" title="Show Password" />
                )}
            </div>
        </div>
    );
};

inputPassword.propTypes = {
    labelFor: PropTypes.node,
    labelName: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'success', 'danger']),
    inputId: PropTypes.node,
    inputName: PropTypes.node,
    placeholder: PropTypes.node,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default inputPassword;
