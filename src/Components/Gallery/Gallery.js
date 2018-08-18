import React from 'react';
import PropTypes from 'prop-types';
import './Gallery.css';
import { List, SearchBox } from 'office-ui-fabric-react/lib/index';
import SmallGridItem from '../SmallGridItem/SmallGridItem';
import DetailPane from '../DetailPane/DetailPane';
import { IconDetailTemplate, ImageDetailTemplate, ComponentDetailTemplate } from '../DetailPane/Templates/index';

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 100;
const RENDERED_WINDOWS_AHEAD = 3;
const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/500/dadada/000000';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filteredItems: [],
      count: 0,
      view: 'grid',
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
  }

  componentDidMount() {
    const { items } = this.props;
    const { filteredItems } = this.state;
    this.setState({
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

  getItemCountForPage(itemIndex, surfaceRect) {
    if (itemIndex === 0) {
      this.columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this.columnWidth = Math.floor(surfaceRect.width / this.columnCount);
      this.rowHeight = this.columnWidth;
    }

    return this.columnCount * ROWS_PER_PAGE;
  }

  getPageHeight() {
    return this.rowHeight * ROWS_PER_PAGE;
  }

  render() {
    const {
      items,
      filteredItems,
      count,
      currentItem,
      view,
    } = this.state;

    const {
      itemType,
      urlprefix,
      footerContent,
    } = this.props;

    let detailTemplate;
    switch (itemType) {
      case 'icon':
        detailTemplate = (<IconDetailTemplate {...currentItem} urlprefix={urlprefix} />);
        break;
      case 'image':
        detailTemplate = (<ImageDetailTemplate {...currentItem} urlprefix={urlprefix} />);
        break;
      case 'component':
        detailTemplate = (<ComponentDetailTemplate {...currentItem} urlprefix={urlprefix} />);
        break;
      default:
        detailTemplate = (<IconDetailTemplate {...currentItem} urlprefix={urlprefix} />);
    }

    return (
      <div className="Gallery ms-Grid">
        <div className="ms-Grid-row Gallery-search">
          <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg6 ms-xl4">
            <SearchBox
              placeholder="Search icons"
              onChange={(value) => {
                const query = value.toLowerCase();
                this.setState({
                  filteredItems: items.filter((item) => {
                    const metadata = `${item.name.toLowerCase()} ${item.keywords ? item.keywords.join(' ').toLowerCase() : ''}`;
                    return metadata.indexOf(query) >= 0;
                  }),
                });
                this.setState({
                  count: filteredItems.length,
                });
              }}
            />
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg6 ms-xl4">
            <p>
              {`Displaying ${count} result(s).`}
            </p>
          </div>
        </div>
        <div className="Gallery-body ms-Grid-row">
          <div className="ms-Grid-col ms-lg9">
            <List
              items={filteredItems}
              renderedWindowsAhead={RENDERED_WINDOWS_AHEAD}
              getItemCountForPage={this.getItemCountForPage}
              getPageHeight={this.getPageHeight}
              onRenderCell={(item) => {
                let styledItem;
                if (view === 'grid') {
                  styledItem = (
                    <div style={{
                      width: `${this.columnWidth}px`,
                      height: `${this.columnWidth}px`,
                    }}
                    >
                      <SmallGridItem
                        {...item}
                        urlprefix={urlprefix}
                        onClick={e => this.onItemClick(e, item)}
                      />
                    </div>
                  );
                }
                // TODO: list view
                return styledItem;
              }}
            />
          </div>
          <div className="ms-Grid-col ms-lg3 ms-hiddenMdDown">
            {currentItem ? (
              <DetailPane
                header={currentItem.name}
                imagesrc={`${urlprefix}${currentItem.name}`}
                urlprefix={urlprefix}
                footerContent={footerContent}
              >
                {detailTemplate}
              </DetailPane>
            ) : (
              <DetailPane
                footerContent={footerContent}
              >
                {'Select an item from the list to view details and get download links.'}
              </DetailPane>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  itemType: PropTypes.string,
  items: PropTypes.array.isRequired,
  urlprefix: PropTypes.string,
  footerContent: PropTypes.object,
};

Gallery.defaultProps = {
  itemType: 'icon',
  urlprefix: IMAGE_PLACEHOLDER,
  footerContent: {},
};

export default Gallery;
