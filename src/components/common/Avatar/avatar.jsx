import React from "react";
import PropTypes from 'prop-types';
import styles from './avatar.module.css';

const Avatar = ({ name, tailwindClass = '' }) => {
    const nameParts = name.split(" ");
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
    const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";
    const avatarClass = `${styles.profileImage} ${tailwindClass}`;

    return (
        <span className={avatarClass}>
            {firstNameInitial}
            {lastNameInitial}
        </span>
    );
};

Avatar.propTypes = {
    tailwindClass: PropTypes.string,
};

export default Avatar;
