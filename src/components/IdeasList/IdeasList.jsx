import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../styles/components/IdeasList.module.css';
import Idea from '../Idea/Idea';

const IdeasList = ({ ideas, handleDelete }) => {
  return (
    <ul className={classes.list}>
      {ideas.map((idea, index) => (
        <React.Fragment key={idea.id}>
          <h1 className={classes.index}>{index + 1}</h1>
          <Idea idea={idea} handleDelete={handleDelete} />
        </React.Fragment>
      ))}
    </ul>
  );
};

IdeasList.propTypes = {
  ideas: PropTypes.array,
  handleDelete: PropTypes.func,
};

export default IdeasList;
