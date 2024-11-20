import PropTypes from 'prop-types';
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose, children, tailwindClass='' }) => {
    if (!isOpen) return null;

    const modalContent = `${tailwindClass}`;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modalContent} ${modalContent}`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
