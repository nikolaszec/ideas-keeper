import React from 'react';
import CallToAction from '../components/CallToAction/CallToAction';
import classes from '../styles/pages/LoginPage.module.css';
import { ReactComponent as LightImg } from '../assets/images/light.svg';
const LoginPage = () => {
  return (
    <div className={classes.loginPage}>
      <h1 className={classes.title}>
        IDEAS KEEPER{' '}
        <LightImg className={`${classes['blink-1']} ${classes.lightImg}`} />
      </h1>
      <h3 className={`${classes['tracking-in-expand']} ${classes.subtitle}`}>
        Store all your ideas at one place
      </h3>
      <CallToAction />
    </div>
  );
};

export default LoginPage;
