import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../firebase/firebase.util';
import { login } from '../../redux/session/sessionActions';
import classes from '../../styles/components/CallToAction/CallToAction.module.css';
import animations from '../../styles/Animations.module.css';

const CallToAction = () => {
  const dispatch = useDispatch();
  return (
    <button
      className={`${classes.loginBtn} ${animations['bounce-in-bottom']}`}
      onClick={() =>
        signInWithGoogle().then(() => {
          dispatch(login());
        })
      }
    >
      Login with Google
    </button>
  );
};

export default CallToAction;
