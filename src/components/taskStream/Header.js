import PropTypes from "prop-types";
import React from "react";

const Header = props => {
  const { name } = props;
  return (<div className='taskHeader'>{name}</div>);
};

Header.propTypes = {
  name: PropTypes.string,
};

export default Header;