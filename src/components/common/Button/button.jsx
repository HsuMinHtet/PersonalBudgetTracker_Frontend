import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ text, onClick, type = 'button', variant = 'primary', tailwindClass = '' },) => {

    const buttonWrapperClass = `${styles.buttonWrapper}`;
    const buttonClass = `${styles.button} ${styles[variant]} ${tailwindClass}`;

    return (
        <div className={buttonWrapperClass}>
            <button type={type} onClick={onClick} className={buttonClass}>
                {text}
            </button>
        </div>
    );
};

Button.propTypes = {
    text: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    tailwindClass: PropTypes.string,
};

export default Button;
