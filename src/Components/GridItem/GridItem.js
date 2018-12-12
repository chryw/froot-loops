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

    this.IMAGE_PLACEHOLDER = 'https://via.placeholder.com/100/dadada/000000';

    this.state = {
      isActive: false,
      isCalloutVisible: false,
    };

    this.onClick = () => {
      const {
        isActive,
        isCalloutVisible,
      } = this.state;

      this.setState({
        isActive: !isActive,
        isCalloutVisible: !isCalloutVisible,
      });
    };

    this.dismissCallout = (e) => {
      if (!this.gridItemRef.current.contains(e.target)) {
        this.setState({
          isCalloutVisible: false,
        });
      }
    };
  }

  componentWillMount() {
    // Create ref
    this.gridItemRef = React.createRef();

    // Add listener to detect click inside or outside the element
    document.addEventListener('click', this.dismissCallout, false);
  }

  componentWillUnmount() {
    // Remove listener when no longer needed
    document.removeEventListener('click', this.dismissCallout, false);
  }

  render() {
    const {
      isActive,
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
              className={`GridItem${isActive ? ' active' : ''}`}
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
              <DetailCallout
                item={item}
                target={this.gridItemRef.current}
                hidden={!isCalloutVisible}
              />
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
