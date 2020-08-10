import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const LoginRequiredRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.session.loggedIn);

  return (
    <Route
      {...rest}
      render={({ location, ...props }) => {
        if (!loggedIn) {
          return <Redirect to={{ pathname: '/', state: { from: location } }} />;
        } else {
          return (
            <div>
              <Layout>
                <Component {...props} />
              </Layout>
            </div>
          );
        }
      }}
    />
  );
};

LoginRequiredRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default LoginRequiredRoute;
