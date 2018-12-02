import React, { Suspense } from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import PropTypes from 'prop-types';
import {
  List,
  TooltipHost,
  Image,
  ImageFit,
} from 'office-ui-fabric-react/lib/index';
import './GridView.css';

class GridView extends React.Component {
  constructor() {
    super();

    this.ROWS_PER_PAGE = 3;
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

    this.onItemContextMenu = () => {
      console.log('Context menu clicked');
    };
  }

  render() {
    const { items } = this.props;
    return (
      <List
        className="GridView"
        items={items}
        renderedWindowsAhead={2}
        renderedWindowsBefore={2}
        getItemCountForPage={this.getItemCountForPage}
        getPageHeight={this.getPageHeight}
        onRenderCell={item => (
          <TooltipHost
            content={item.name}
            calloutProps={{ gapSpace: 0 }}
          >
            <div
              ref={this.elementRef}
              className="GridItem"
              onContextMenu={this.onItemContextMenu}
              type="button"
              style={{
                width: `${this.columnWidth}px`,
                height: `${this.rowHeight}px`,
                padding: `${this.ITEM_PADDING}px`,
              }}
            >
              <Image
                src={this.IMAGE_PLACEHOLDER}
                alt={item.name}
                imageFit={ImageFit.contain}
                width="100%"
                height="100%"
              />
            </div>
          </TooltipHost>
        )}
      />
    );
  }
}

GridView.propTypes = {
  items: PropTypes.array.isRequired,
};

export default GridView;
