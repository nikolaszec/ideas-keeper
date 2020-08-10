import React from 'react';
import PropTypes from 'prop-types';
import { auth } from '../../firebase/firebase.util';
import { withRouter } from 'react-router-dom';
import classes from '../../styles/components/Layout.module.css';

const Layout = ({ children, history, isIndexPage }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.nav}>
        {!isIndexPage && (
          <button onClick={() => history.goBack()} className={classes.backBtn}>
            {' '}
            &#8617;
          </button>
        )}
        <button
          className={classes.logoutBtn}
          onClick={() => {
            auth.signOut().then(() => history.push('/'));
          }}
        >
          LOGOUT
        </button>
      </div>

      {children}
    </div>
  );
};

Layout.defaultProps = {
  isIndexPage: false,
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  history: PropTypes.object,
  isIndexPage: PropTypes.bool,
};

export default withRouter(Layout);
