import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchBox,
  DefaultButton,
} from 'office-ui-fabric-react/lib/index';
import GridView from '../GridView';
import ListView from '../ListView';
import './Gallery.css';

const CHUNK_SIZE = 30;

class Gallery extends React.Component {
  constructor() {
    super();

    // Initialize state
    this.state = {
      allItems: [],
      filteredItems: [],
      renderItems: [],
      startIndex: 0,
    };

    // Limit item amount
    this.limitResult = (items, amount) => {
      let itemsLimited;
      if (items && amount) {
        itemsLimited = items.slice(0, amount);
      } else {
        itemsLimited = items;
      }
      return itemsLimited;
    };

    // Filter result
    this.filterResult = (items, query) => (
      items.filter((item) => {
        const metadata = `${item.name.toLowerCase()} ${item.keywords ? item.keywords.toLowerCase() : ''} ${item.description ? item.description.toLowerCase() : ''}`;
        return metadata.indexOf(query.toLowerCase()) >= 0;
      })
    );

    // Append chunk
    this.appendChunk = (baseItems) => {
      const {
        renderItems,
        startIndex,
      } = this.state;
      // Save current startIndex
      let newStartIndex = startIndex;
      if (startIndex + CHUNK_SIZE < baseItems.length) {
        // Increase startIndex if haven't reached to the end
        newStartIndex += CHUNK_SIZE;
        this.setState({
          // Save new startIndex
          startIndex: newStartIndex,
          // Append a chunk to the original chunk
          // using ES6 array spread syntax: [...array1, ...array2]
          renderItems: [
            ...renderItems,
            ...baseItems
              .slice(
                newStartIndex,
                newStartIndex + CHUNK_SIZE,
              )],
        });
      }
    };
  }

  componentDidMount() {
    const {
      items,
      limit,
      defaultViewMode,
    } = this.props;

    this.setState({
      allItems: this.limitResult(items, limit),
      filteredItems: this.limitResult(items, limit),
      renderItems: items.slice(0, CHUNK_SIZE),
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
      renderItems,
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
            items={renderItems}
            itemProps={itemProps}
            imageSize={imageSize}
          />
        );
      // Fabric DetailsList
      case 'list':
        return (
          <ListView
            items={renderItems}
            itemProps={itemProps}
            fieldNames={itemProps}
          />
        );
      default:
        return (
          <GridView
            items={renderItems}
            itemProps={itemProps}
            imageSize={imageSize}
          />
        );
    }
  }

  render() {
    const {
      allItems,
      filteredItems,
      renderItems,
      startIndex,
    } = this.state;

    return (
      <div className="Gallery">
        <div className="Gallery-header">
          <SearchBox
            className="Gallery-SearchBox"
            placeholder="Search icons"
            onChange={(query) => {
              this.setState({
                // Save filter result as the base collection for load more handler
                filteredItems: this.filterResult(allItems, query),
                renderItems: this.filterResult(allItems, query)
                  .slice(startIndex, startIndex + CHUNK_SIZE),
              });
            }}
          />
        </div>
        <div
          className="Gallery-body ms-clearfix"
        >
          {this.renderView()}
        </div>
        <div
          className={`Gallery-loadmore ${renderItems.length === allItems.length ? 'hidden' : ''}`}
        >
          <DefaultButton
            text="Load more..."
            onClick={() => this.appendChunk(filteredItems)}
          />
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  limit: PropTypes.number,
  itemProps: PropTypes.arrayOf(PropTypes.object),
  defaultViewMode: PropTypes.string,
  imageSize: PropTypes.number,
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
};

export default Gallery;
