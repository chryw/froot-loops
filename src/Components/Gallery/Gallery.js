import React from 'react';
import PropTypes from 'prop-types';
import './Gallery.css';
import {
  CommandBar,
  DefaultButton,
  DetailsList,
  IconButton,
  List,
  SearchBox,
} from 'office-ui-fabric-react/lib/index';
import GridItem from '../GridItem/GridItem';
import TileItem from '../TileItem/TileItem';
import DetailPane from '../DetailPane/DetailPane';
import { IconDetailTemplate, ImageDetailTemplate, ComponentDetailTemplate } from '../DetailPane/Templates/index';

const ROWS_PER_PAGE = 2;
const RENDERED_WINDOWS_AHEAD = 2;
const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/500/dadada/000000';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filteredItems: [],
      count: 0,
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
    this.getItemCountForPage = this.getItemCountForPage.bind(this);
    this.getPageHeight = this.getPageHeight.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onViewButtonClick = this.onViewButtonClick.bind(this);
  }

  componentDidMount() {
    const { items, viewModes } = this.props;
    const { filteredItems } = this.state;
    this.setState({
      viewMode: viewModes[0],
      items: this.limitResult(
        this.filterResult(items),
        -1,
      ),
      filteredItems: this.limitResult(
        this.filterResult(items),
        -1,
      ),
    });
    this.setState({
      count: filteredItems.length,
    });
  }

  onItemClick(e, currentItem) {
    this.setState({
      currentItem,
    });
  }

  onViewButtonClick(viewMode) {
    this.setState({
      viewMode,
    });
  }

  getItemCountForPage(itemIndex, surfaceRect) {
    const { viewMode } = this.state;
    let maxRowHeight;
    switch (viewMode) {
      case 'grid':
        maxRowHeight = 100;
        break;
      case 'tile':
        maxRowHeight = 360;
        break;
      default:
        maxRowHeight = 100;
    }
    if (itemIndex === 0) {
      this.columnCount = Math.ceil(surfaceRect.width / maxRowHeight);
      this.columnWidth = Math.floor(surfaceRect.width / this.columnCount);
      this.rowHeight = this.columnWidth;
    }
    return this.columnCount * ROWS_PER_PAGE;
  }

  getPageHeight() {
    return this.rowHeight * ROWS_PER_PAGE;
  }

  renderDetailPane() {
    const { itemType, urlprefix, footerContent } = this.props;
    const { currentItem } = this.state;
    let detailPaneBody;
    switch (itemType) {
      case 'icon':
        detailPaneBody = (<IconDetailTemplate {...currentItem} urlprefix={urlprefix} />);
        break;
      case 'image':
        detailPaneBody = (<ImageDetailTemplate {...currentItem} urlprefix={urlprefix} />);
        break;
      case 'component':
        detailPaneBody = (<ComponentDetailTemplate {...currentItem} urlprefix={urlprefix} />);
        break;
      default:
        detailPaneBody = (<IconDetailTemplate {...currentItem} urlprefix={urlprefix} />);
    }
    return (
      <div className="Gallery-detailPane">
        {currentItem ? (
          <DetailPane
            header={currentItem.name}
            imagesrc={`${urlprefix}${currentItem.name}`}
            urlprefix={urlprefix}
            footerContent={footerContent}
          >
            {detailPaneBody}
          </DetailPane>
        ) : (
          <DetailPane
            footerContent={footerContent}
          >
            {'Select an item from the list to view details and get download links.'}
          </DetailPane>
        )}
      </div>
    );
  }

  renderView() {
    const {
      filteredItems,
      viewMode,
    } = this.state;

    const {
      urlprefix,
      fieldNames,
    } = this.props;

    const gridView = (
      <div className="Gallery-grid ms-Grid-row">
        <div className="ms-Grid-col ms-lg9">
          <List
            items={filteredItems}
            renderedWindowsAhead={RENDERED_WINDOWS_AHEAD}
            getItemCountForPage={this.getItemCountForPage}
            getPageHeight={this.getPageHeight}
            onRenderCell={item => (
              <GridItem
                {...item}
                urlprefix={urlprefix}
                onClick={e => this.onItemClick(e, item)}
                width={this.columnWidth}
                height={this.columnWidth}
              />
            )}
          />
        </div>
        <div className="ms-Grid-col ms-lg3 ms-hiddenMdDown">
          {this.renderDetailPane()}
        </div>
      </div>
    );

    const listView = (
      <DetailsList
        className="Gallery-list ms-Grid-row"
        items={filteredItems}
        selectionPreservedOnEmptyClick
        columns={fieldNames}
      />
    );

    const tileView = (
      <List
        items={filteredItems}
        renderedWindowsAhead={RENDERED_WINDOWS_AHEAD}
        getItemCountForPage={this.getItemCountForPage}
        getPageHeight={this.getPageHeight}
        onRenderCell={item => (
          <TileItem
            {...item}
            urlprefix={urlprefix}
            width={this.columnWidth}
            height={this.columnWidth}
          />
        )}
      />
    );

    switch (viewMode) {
      case 'grid':
        return gridView;
      case 'list':
        return listView;
      case 'tile':
        return tileView;
      default:
        return gridView;
    }
  }

  render() {
    const {
      items,
      filteredItems,
      count,
      viewMode,
    } = this.state;

    return (
      <div className="Gallery ms-Grid scroll-wrapper">
        <div className="ms-Grid-row Gallery-header scroll-sticky">
          <CommandBar
            className="ms-Grid-col ms-sm12"
            items={[
              {
                key: 'search',
                onRender: () => (
                  <SearchBox
                    placeholder="Search icons"
                    onChange={(query) => {
                      this.setState({
                        filteredItems: items.filter((item) => {
                          const metadata = `${item.name.toLowerCase()} ${item.keywords ? item.keywords.join(' ').toLowerCase() : ''}`;
                          return metadata.indexOf(query.toLowerCase()) >= 0;
                        }),
                      });
                      this.setState({
                        count: filteredItems.length,
                      });
                    }}
                  />
                ),
              },
            ]}
            overflowItems={[
              {
                key: 'viewMode1',
                name: 'Grid view',
                icon: 'GridViewSmall',
                checked: (viewMode === 'grid'),
                onClick: () => this.onViewButtonClick('grid'),
              },
              {
                key: 'viewMode2',
                name: 'List view',
                icon: 'BulletedList2',
                checked: (viewMode === 'list'),
                onClick: () => this.onViewButtonClick('list'),
              },
              {
                key: 'viewMode3',
                name: 'Tile view',
                icon: 'PictureTile',
                checked: (viewMode === 'tile'),
                onClick: () => this.onViewButtonClick('tile'),
              },
            ]}
          />
        </div>
        <div className="Gallery-body ms-Grid scroll-scrollable">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  itemType: PropTypes.string,
  viewModes: PropTypes.array,
  items: PropTypes.array.isRequired,
  fieldNames: PropTypes.array.isRequired,
  urlprefix: PropTypes.string,
  footerContent: PropTypes.object,
};

Gallery.defaultProps = {
  itemType: 'icon',
  viewModes: ['grid'],
  urlprefix: IMAGE_PLACEHOLDER,
  footerContent: {},
};

export default Gallery;
