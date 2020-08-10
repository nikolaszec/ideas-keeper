import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../styles/components/Idea/Data.module.css';

const Data = ({ children, displayName }) => {
  return (
    <div className={classes.dataWrapper}>
      <h5 className={classes.displayName}>{displayName}</h5>
      {children}
    </div>
  );
};

Data.propTypes = {
  children: PropTypes.element.isRequired,
  displayName: PropTypes.string.isRequired,
};

export default Data;
