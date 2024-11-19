import PropTypes from "prop-types";
import styles from './link.module.css';

const Link = ({ href, text, target = "_self", tailwindClass = "" }) => {
    
    const linkClass = `${styles.link}, ${tailwindClass}`;

    const isExternal = href.startsWith("http");

    return isExternal ? (
        <a href={href} target={target} rel="noopener noreferrer" className={linkClass}>
            {text}
        </a>
    ) : (
            <a href={href} className={linkClass}>
            {text}
        </a>
    );
};

Link.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.node.isRequired,
    target: PropTypes.oneOf(["_self", "_blank"]),
    className: PropTypes.string,
    tailwindClass: PropTypes.string,
};

export default Link;
