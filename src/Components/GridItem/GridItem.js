import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  TooltipHost,
  Image,
  ImageFit,
  DefaultButton,
} from 'office-ui-fabric-react/lib/index';
import {
  getFigmaImages,
} from '../../actions/figmaActions';
import DetailCallout from '../DetailCallout';
import './GridItem.css';

class GridItem extends React.Component {
  constructor() {
    super();
    // Create ref
    this.gridItemRef = React.createRef();

    this.state = {
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

  componentDidMount() {
    const {
      figmaFileKey,
    } = this.props;
    if (figmaFileKey) {
      const {
        item,
        getFigmaImagesConnect,
      } = this.props;
      getFigmaImagesConnect(figmaFileKey, item.id);
    }
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
      itemProps,
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
                src={item.imageUrl || 'https://via.placeholder.com/200'}
                alt={item.name}
                imageFit={ImageFit.centerCover}
                width="100%"
                height="100%"
              />
              { isCalloutVisible ? (
                <DetailCallout
                  item={item}
                  itemProps={itemProps}
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

const mapStateToProps = state => ({
  images: state.figmaNodes.images,
});

GridItem.propTypes = {
  figmaFileKey: PropTypes.string,
  item: PropTypes.object.isRequired,
  itemProps: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  getFigmaImagesConnect: PropTypes.func.isRequired,
};

GridItem.defaultProps = {
  figmaFileKey: null,
  itemProps: [
    {
      key: 'name',
    },
  ],
  width: 96,
  height: 96,
  padding: 16,
};

export default connect(
  mapStateToProps,
  {
    getFigmaImagesConnect: getFigmaImages,
  },
)(GridItem);
