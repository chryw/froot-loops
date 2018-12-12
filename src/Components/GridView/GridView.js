import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
} from 'office-ui-fabric-react/lib/index';
import GridItem from '../GridItem/GridItem';
import './GridView.css';

class GridView extends React.Component {
  constructor() {
    super();

    this.ROWS_PER_PAGE = 6;
    this.MAX_ROW_HEIGHT = 100;
    this.IMAGE_PLACEHOLDER = 'https://via.placeholder.com/100/dadada/000000';
    this.ITEM_PADDING = 16;

    this.elementRef = React.createRef();

    this.getItemCountForPage = (itemIndex, surfaceRect) => {
      if (itemIndex === 0) {
        this.columnCount = Math.ceil(surfaceRect.width / this.MAX_ROW_HEIGHT);
        this.columnWidth = Math.floor(surfaceRect.width / this.columnCount);
        this.rowHeight = this.columnWidth;
      }
      return this.columnCount * this.ROWS_PER_PAGE;
    };

    this.getPageHeight = () => this.rowHeight * this.ROWS_PER_PAGE;
  }

  render() {
    const { items } = this.props;
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
};

export default GridView;
