import React from 'react';
import PropTypes from 'prop-types';

// TODO: Add png fallback
const SpriteImage = (props) => {
  const { name } = props;
  return (
    <svg className={`SpriteImage SpriteImage-${name}`}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

SpriteImage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SpriteImage;
