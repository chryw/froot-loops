import React from 'react';
import PropTypes from 'prop-types';
import {
  TooltipHost,
  Image,
  ImageFit,
  DefaultButton,
} from 'office-ui-fabric-react/lib/index';
import DetailCallout from '../DetailCallout/DetailCallout';
import './GridItem.css';

class GridItem extends React.Component {
  constructor() {
    super();
    // Create ref
    this.gridItemRef = React.createRef();

    this.IMAGE_PLACEHOLDER = 'https://via.placeholder.com/100/dadada/000000';

    this.state = {
      isActive: false,
      isCalloutVisible: false,
    };

    this.onClick = () => {
      const {
        isCalloutVisible,
      } = this.state;

      this.setState({
        isCalloutVisible: !isCalloutVisible,
      });
    };
  }

  render() {
    const {
      isCalloutVisible,
    } = this.state;

    const {
      item,
      width,
      height,
      padding,
    } = this.props;

    return (
      item ? (
        <div
          ref={this.gridItemRef}
        >
          <TooltipHost
            content={item.name}
            calloutProps={{ gapSpace: 0 }}
          >
            <DefaultButton
              className="GridItem"
              type="button"
              onClick={this.onClick}
              onKeyDown={this.onClick}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                padding: `${padding}px`,
              }}
            >
              <Image
                src={this.IMAGE_PLACEHOLDER}
                alt={item.name}
                imageFit={ImageFit.contain}
                width="100%"
                height="100%"
              />
              { isCalloutVisible ? (
                <DetailCallout
                  item={item}
                  target={this.gridItemRef.current}
                  isVisible={isCalloutVisible}
                />
              ) : null}
            </DefaultButton>
          </TooltipHost>
        </div>
      ) : (
        null
      )
    );
  }
}

GridItem.propTypes = {
  item: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
};

GridItem.defaultProps = {
  width: 96,
  height: 96,
  padding: 16,
};

export default GridItem;
