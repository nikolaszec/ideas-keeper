import React from 'react';
import classes from '../../styles/components/Spinner/Spinner.module.css';

const Spinner = () => (
  <div className={classes['lds-ripple']}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Spinner;
