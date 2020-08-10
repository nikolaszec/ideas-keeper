import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from '../../styles/components/Idea/Idea.module.css';
import Data from './Data';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MoreTextContainer from '../MoreTextContainer/MoreTextContainer';

dayjs.extend(relativeTime);

const Idea = ({ idea, handleDelete }) => {
  const {
    id,
    title,
    description,
    expectations,
    createdAt,
    rating,
    category,
  } = idea;

  return (
    <div className={classes.item}>
      <div className={classes.actionsWrapper}>
        <Link className={classes.edit} to={`/edit/${id}`}>
          &#x270E;
        </Link>
        <button className={classes.delete} onClick={() => handleDelete(id)}>
          &#x58;
        </button>
      </div>
      <Data displayName="Title">
        <p>{title}</p>
      </Data>
      <Data displayName="Description">
        <MoreTextContainer text={description} />
      </Data>
      <Data displayName="Expectations">
        <MoreTextContainer text={expectations} />
      </Data>
      <div className={classes.flex}>
        <Data displayName="Category">
          <p>{category}</p>
        </Data>
        <Data displayName="Rating">
          <p>{rating}</p>
        </Data>
      </div>

      <Data displayName="Created">
        <p>{dayjs(createdAt).fromNow()}</p>
      </Data>
    </div>
  );
};

Idea.propTypes = {
  idea: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    expectations: PropTypes.string.isRequired,
  }),
  handleDelete: PropTypes.func.isRequired,
};

export default Idea;
