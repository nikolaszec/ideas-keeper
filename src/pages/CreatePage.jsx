import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Form from '../forms/Form';
import { useDispatch } from 'react-redux';
import { createIdeaAsync } from '../redux/session/sessionActions';

const CreatePage = ({ history }) => {
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(createIdeaAsync(values)).then(() => {
      history.push('/');
    });
  };
  return (
    <div>
      <h1 className={'formPageTitle'}>CREATE IDEA</h1>
      <Form handleSubmit={handleSubmit} />
    </div>
  );
};

CreatePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(CreatePage);
