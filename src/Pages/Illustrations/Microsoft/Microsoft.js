import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spinner,
  SpinnerSize,
  Link,
  Image,
  ImageFit,
} from 'office-ui-fabric-react/lib/index';
import {
  getFigmaNodes,
} from '../../../actions/figmaActions';
import Page from '../../../Components/Page';
import Gallery from '../../../Components/Gallery';

const itemProps = [
  {
    key: 'image',
    minWidth: 200,
    maxWidth: 200,
    isResizable: false,
    onRender: item => (
      <Image
        src={`${item.imageUrl}`}
        alt={item.name}
        imageFit={ImageFit.contain}
        width={100}
        height={100}
      />
    ),
  },
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'category',
    name: 'Category',
    fieldName: 'category',
    minWidth: 100,
    maxWidth: 100,
    isResizable: true,
  },
  {
    key: 'group',
    name: 'Group',
    fieldName: 'group',
    minWidth: 100,
    maxWidth: 100,
    isResizable: true,
  },
  {
    key: 'keywords',
    name: 'Keywords',
    fieldName: 'keywords',
    isMultiline: true,
    minWidth: 200,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'description',
    name: 'Description',
    fieldName: 'description',
    minWidth: 200,
    isMultiline: true,
    isResizable: true,
  },
  {
    key: 'downloads',
    name: 'Downloads',
    fieldName: 'downloads',
    minWidth: 200,
    maxWidth: 200,
    iconProps: {
      iconName: 'Embed',
    },
    isResizable: true,
    onRender: item => (
      <div
        className="DetailsList-downloads"
      >
        <Link href={item.imageUrl} download>
          {'PNG'}
        </Link>
      </div>
    ),
  },
];

class Microsoft extends React.Component {
  componentDidMount() {
    const { figmaFileKey, getFigmaNodesConnect } = this.props;
    getFigmaNodesConnect(figmaFileKey);
  }

  render() {
    const { items } = this.props;
    return (
      <Page
        {...this.props}
      >
        {items.length ? (
          <Gallery
            items={items}
            itemProps={itemProps}
            defaultViewMode="grid"
            imageSize={200}
          />
        ) : (
          <Spinner
            size={SpinnerSize.large}
            label="Fetching data from Figma. This may take a few seconds."
            ariaLive="assertive"
          />
        )}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  items: state.figmaNodes.items,
});

Microsoft.propTypes = {
  title: PropTypes.string.isRequired,
  figmaFileKey: PropTypes.string.isRequired,
  getFigmaNodesConnect: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  {
    getFigmaNodesConnect: getFigmaNodes,
  },
)(Microsoft);
