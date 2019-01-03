import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchBox,
} from 'office-ui-fabric-react/lib/index';
import GridView from '../GridView';
import ListView from '../ListView';
import './Gallery.css';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filteredItems: [],
    };
    this.limitResult = (data, amount) => {
      let dataLimited;
      if (data && amount) {
        dataLimited = data.slice(0, amount);
      } else {
        dataLimited = data;
      }
      return dataLimited;
    };
    this.positions = {};
    this.onViewButtonClick = this.onViewButtonClick.bind(this);
  }

  componentDidMount() {
    const {
      items,
      limit,
      defaultViewMode,
    } = this.props;
    this.setState({
      items: this.limitResult(
        items,
        limit,
      ),
      filteredItems: this.limitResult(
        items,
        limit,
      ),
      viewMode: defaultViewMode,
    });
  }

  onViewButtonClick(viewMode) {
    this.setState({
      viewMode,
    });
  }

  // Render gallery items based on selected view
  renderView() {
    const {
      filteredItems,
      viewMode,
    } = this.state;

    const {
      itemProps,
      imageSize,
    } = this.props;

    switch (viewMode) {
      // Small square thumbnail grid
      case 'grid':
        return (
          <GridView
            items={filteredItems}
            itemProps={itemProps}
            imageSize={imageSize}
          />
        );
      // Fabric DetailsList
      case 'list':
        return (
          <ListView
            items={filteredItems}
            fieldNames={itemProps}
          />
        );
      default:
        return (
          <GridView
            items={filteredItems}
            itemProps={itemProps}
            imageSize={imageSize}
          />
        );
    }
  }

  render() {
    const {
      items,
    } = this.state;

    return (
      <div className="Gallery">
        <div className="Gallery-header">
          <SearchBox
            className="Gallery-SearchBox"
            placeholder="Search icons"
            onChange={(query) => {
              this.setState({
                filteredItems: items.filter((item) => {
                  const metadata = `${item.name.toLowerCase()} ${item.keywords ? item.keywords.toLowerCase() : ''} ${item.description ? item.description.toLowerCase() : ''}`;
                  return metadata.indexOf(query.toLowerCase()) >= 0;
                }),
              });
            }}
          />
        </div>
        <div
          className="Gallery-body"
        >
          {this.renderView()}
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  items: PropTypes.array.isRequired,
  limit: PropTypes.number,
  itemProps: PropTypes.array,
  defaultViewMode: PropTypes.string,
  imageSize: PropTypes.number,
  urlprefix: PropTypes.string,
};

Gallery.defaultProps = {
  limit: -1,
  itemProps: [
    {
      key: 'key',
      name: 'name',
      fieldName: 'fieldName',
    },
  ],
  defaultViewMode: 'grid',
  imageSize: 100,
  urlprefix: '/',
};

export default Gallery;
