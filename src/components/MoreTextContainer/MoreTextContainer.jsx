import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';
import classes from '../../styles/components/MoreTextContainer/MoreTextContainer.module.css';

const MoreTextContainer = ({ text }) => {
  const [show, handleShow] = useState(false);
  return (
    <div className={classes.container}>
      <ShowMoreText
        lines={3}
        more="Show more"
        less="Show less"
        anchorClass={classes.moreTextLink}
        onClick={() => handleShow(!show)}
        expanded={show}
        width={280}
      >
        {text}
      </ShowMoreText>
    </div>
  );
};

MoreTextContainer.propTypes = {
  text: PropTypes.string,
};

export default MoreTextContainer;
