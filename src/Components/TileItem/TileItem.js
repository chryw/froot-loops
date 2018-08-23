import React from 'react';
import PropTypes from 'prop-types';
import {
  DefaultButton,
  Image,
  ImageFit,
} from 'office-ui-fabric-react/lib/index';

class TileItem extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: 'light',
    };
  }

  render() {
    const {
      id,
      name,
      urlprefix,
      width,
      height,
    } = this.props;
    const { theme } = this.state;

    return (
      <DefaultButton
        className={`TileItem theme-${theme}`}
        id={`TileItem_${id}`}
        style={{
          width,
          height,
        }}
      >
        <div className="TileItem-image">
          <Image
            src={`${urlprefix}/${name}.svg`}
            alt={name}
            imageFit={ImageFit.fill}
            width="100%"
            height="100%"
          />
        </div>
      </DefaultButton>
    );
  }
}

TileItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  urlprefix: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

TileItem.defaultProps = {
  urlprefix: 'https://via.placeholder.com/500/dadada/000000',
  width: 360,
  height: 360,
};

export default TileItem;
