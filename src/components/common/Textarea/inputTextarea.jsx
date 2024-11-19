import PropTypes from 'prop-types';
import styles from './inputTextarea.module.css';

const inputTextarea = ({ labelFor, type = 'text', labelName, variant = 'primary', inputId, inputName, placeholder }) => {

    const inputTextareaClass = `${styles.inputTextarea} ${styles[variant]}`;

    return (
        <div className={inputTextareaClass}>
            <label htmlFor={labelFor}>{labelName}</label>
            <textarea type={type} id={inputId} name={inputName} placeholder={placeholder} rows="4" />
        </div>
    );
};

inputTextarea.propTypes = {
    labelFor: PropTypes.node,
    type: PropTypes.oneOf(['textarea']),
    labelName: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    inputId: PropTypes.node,
    inputName: PropTypes.node,
    placeholder: PropTypes.node,
};

export default inputTextarea;
