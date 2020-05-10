import React from 'react';
import PropTypes from 'prop-types';

const Card = props => {
  const { content} = props;
  return <div>{content}</div>;
};

Card.propTypes = {
  content: PropTypes.string,
};

export default Card;