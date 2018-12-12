import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchBox,
} from 'office-ui-fabric-react/lib/index';
import GridView from '../GridView/GridView';
import ListView from '../ListView/ListView';
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
      if (amount) {
        dataLimited = data.slice(0, amount);
      } else {
        dataLimited = data;
      }
      return dataLimited;
    };
    this.filterResult = (data) => {
      const isPublish = item => item.publish === 1;
      return data.filter(isPublish);
    };
    this.positions = {};
    this.onViewButtonClick = this.onViewButtonClick.bind(this);
  }

  componentDidMount() {
    const {
      items,
      limit,
    } = this.props;
    this.setState({
      items: this.limitResult(
        this.filterResult(items),
        limit,
      ),
      filteredItems: this.limitResult(
        this.filterResult(items),
        limit,
      ),
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
    } = this.props;

    switch (viewMode) {
      // Small square thumbnail grid
      case 'grid':
        return (
          <GridView
            items={filteredItems}
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
                  const metadata = `${item.name.toLowerCase()} ${item.keywords ? item.keywords.join(' ').toLowerCase() : ''}`;
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
  urlprefix: '/',
};

export default Gallery;
