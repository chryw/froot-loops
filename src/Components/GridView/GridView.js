import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
} from 'office-ui-fabric-react/lib/index';
import GridItem from '../GridItem';
import './GridView.css';

class GridView extends React.Component {
  constructor() {
    super();
    this.ROWS_PER_PAGE = 6;
    this.ITEM_PADDING = 16;

    this.elementRef = React.createRef();

    this.getItemCountForPage = (itemIndex, surfaceRect) => {
      const { imageSize } = this.props;
      if (itemIndex === 0) {
        this.columnCount = Math.ceil(surfaceRect.width / imageSize);
        this.columnWidth = Math.floor(surfaceRect.width / this.columnCount);
        this.rowHeight = this.columnWidth;
      }
      return this.columnCount * this.ROWS_PER_PAGE;
    };

    this.getPageHeight = () => this.rowHeight * this.ROWS_PER_PAGE;
  }

  render() {
    const { items, itemProps } = this.props;
    return (
      <List
        className="GridView"
        items={items}
        renderedWindowsAhead={1}
        renderedWindowsBefore={1}
        getItemCountForPage={this.getItemCountForPage}
        getPageHeight={this.getPageHeight}
        onRenderCell={item => (
          <GridItem
            item={item}
            itemProps={itemProps}
            width={this.columnWidth}
            height={this.rowHeight}
            padding={this.ITEM_PADDING}
          />
        )}
      />
    );
  }
}

GridView.propTypes = {
  items: PropTypes.array.isRequired,
  itemProps: PropTypes.array,
  imageSize: PropTypes.number,
};

GridView.defaultProps = {
  itemProps: [
    {
      key: 'name',
    },
  ],
  imageSize: 100,
};

export default GridView;
