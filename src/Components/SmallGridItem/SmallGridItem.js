import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageFit,
  TooltipHost,
} from 'office-ui-fabric-react/lib/index';
import './SmallGridItem.css';

const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/500/dadada/000000';

const SmallGridItem = (props) => {
  const {
    id,
    name,
    onClick,
  } = props;
  return (
    <TooltipHost
      content={name}
      calloutProps={{ gapSpace: 0 }}
    >
      <button
        className="SmallGridItem"
        onClick={onClick}
        onKeyDown={onClick}
        type="button"
        id={`SmallGridItem_${id}`}
      >
        <div className="SmallGridItem-image">
          <Image
            src={IMAGE_PLACEHOLDER}
            alt={name}
            imageFit={ImageFit.fill}
            width="100%"
            height="100%"
          />
        </div>
      </button>
    </TooltipHost>
  );
};

SmallGridItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SmallGridItem;
