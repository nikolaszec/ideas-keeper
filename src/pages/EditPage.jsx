import React from 'react';
import PropTypes from 'prop-types';
import Form from '../forms/Form';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateIdeaAsync } from '../redux/session/sessionActions';
import { useDispatch } from 'react-redux';
const EditPage = ({ match, history }) => {
  const params = match.params.ideaId;
  const dispatch = useDispatch();
  const ideaToEdit = useSelector((state) =>
    state.session.ideas.find((idea) => idea.id === params),
  );
  const handleSubmit = (values) => {
    dispatch(
      updateIdeaAsync(
        {
          ...values,
          createdAt: ideaToEdit.createdAt,
          id: ideaToEdit.id,
        },
        params,
      ),
    ).then(() => {
      history.push('/');
    });
  };
  return (
    <div>
      <h1 className={'formPageTitle'}>EDIT IDEA</h1>
      <Form handleSubmit={handleSubmit} initialValues={ideaToEdit} />
    </div>
  );
};

EditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  history: PropTypes.object,
};

export default withRouter(EditPage);
