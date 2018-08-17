import React from 'react';
import PropTypes from 'prop-types';
import './Gallery.css';
import { List, SearchBox, Link } from 'office-ui-fabric-react/lib/index';
import SmallGridItem from '../SmallGridItem/SmallGridItem';
import DetailPane from '../DetailPane/DetailPane';

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
      footer,
    } = this.props;
    return (
      <div className="Gallery ms-Grid">
        <div className="ms-Grid-row">
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
            <DetailPane
              header={currentItem ? currentItem.name : ''}
              imagesrc={currentItem ? `${IMAGE_PLACEHOLDER}?text=${currentItem.name}` : ''}
              footer={footer}
            >
              {currentItem ? (
                <div>
                  <h2 className="ms-font-xl">
                    {'Keywords'}
                  </h2>
                  <p>
                    {currentItem.keywords ? currentItem.keywords.join(', ') : ''}
                  </p>
                  <h2 className="ms-font-xl">
                    {'Description'}
                  </h2>
                  <p>
                    {currentItem.description}
                  </p>
                  <h2 className="ms-font-xl">
                    {'Downloads'}
                  </h2>
                  <div>
                    <Link href={IMAGE_PLACEHOLDER} download>
                      {'SVG'}
                    </Link>
                    <Link href={IMAGE_PLACEHOLDER} download>
                      {'PNG'}
                    </Link>
                    <Link href={IMAGE_PLACEHOLDER} download>
                      {'XAML'}
                    </Link>
                  </div>
                </div>
              ) : ''}
            </DetailPane>
          </div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  items: PropTypes.array.isRequired,
  footer: PropTypes.object,
};

Gallery.defaultProps = {
  footer: {},
};

export default Gallery;
