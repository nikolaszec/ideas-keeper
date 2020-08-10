import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIdeaAsync } from '../redux/session/sessionActions';
import { withRouter } from 'react-router-dom';
import classes from '../styles/pages/IdeasPage.module.css';
import IdeasList from '../components/IdeasList/IdeasList';
import Spinner from '../components/Spinner/Spinner';

const IdeasPage = ({ history }) => {
  const dispatch = useDispatch();
  const ideas = useSelector((state) => state.session.ideas);
  const loading = useSelector((state) => state.session.loading);
  const handleDelete = useCallback((id) => dispatch(deleteIdeaAsync(id)), [
    dispatch,
  ]);

  return (
    <div>
      <div>
        <h1 className={classes.title}>Ideas</h1>
        <button
          className={classes.addNewBtn}
          onClick={() => history.push('/create')}
        >
          &#43;
        </button>
        {loading ? (
          <Spinner />
        ) : (
          <IdeasList ideas={ideas} handleDelete={handleDelete} />
        )}
        {ideas.length === 0 ? (
          <h2 className={classes.info}>Add your ideas.</h2>
        ) : null}
      </div>
    </div>
  );
};

IdeasPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(IdeasPage);
