import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../styles/forms/ErrorMessage.module.css';

const ErrorMessage = ({ errors, name }) => {
  return (
    <div className={classes.wrapper}>
      {errors[`${name}`] && (
        <p className={classes.message}>{errors[`${name}`].message}</p>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default ErrorMessage;
