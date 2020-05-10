import React from 'react';
import PropTypes from 'prop-types';

import './card.css';

const Card = props => {
  const { content} = props;
  return <div className="card">{content}</div>;
};

Card.propTypes = {
  content: PropTypes.string,
};

export default Card;