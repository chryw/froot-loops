import React from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  SpinnerSize,
  Link,
  Image,
  ImageFit,
} from 'office-ui-fabric-react/lib/index';
import axios from 'axios';
import Page from '../../../Components/Page';
import Gallery from '../../../Components/Gallery';

class Microsoft extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };

    // Get data from Figma
    this.getDataFromFigma = url => (
      axios({
        method: 'get',
        timeout: 5000,
        headers: {
          'X-Figma-Token': process.env.REACT_APP_FIGMAKEY,
        },
        url,
      })
    );

    // Figma url prefix
    this.urlprefix = '';

    // Extract public COMPONENT nodes from Figma file data, add page and frame info
    this.extractFigmaFileNodes = figmaDocumentData => (
      figmaDocumentData.children // Pages
        .filter(page => page.name.indexOf('***') < 0) // Skip local pages
        .map(page => (
          page.children // Frames
            .filter(frame => frame.name.indexOf('***') < 0) // Skip local frames
            .map(frame => (
              frame.children // Nodes
                .filter(node => node.name.indexOf('***') < 0 && node.type === 'COMPONENT') // Skip local nodes and instances
                .map(node => ({
                  id: node.id,
                  name: node.name,
                  category: page.name,
                  group: frame.name,
                })) // Reformat array with page name as category, frame name as group
            ))
            .reduce((prev, curr) => prev.concat(curr)) // Flatten frame array
        ))
        .reduce((prev, curr) => prev.concat(curr)) // Flatten page array
    );

    // Define itemProps for Gallery
    this.itemProps = [
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
  }

  componentDidMount() {
    const { figmaFileKey } = this.props;

    // Get file data from Figma
    this.getDataFromFigma(`https://api.figma.com/v1/files/${figmaFileKey}`)
      .then((response) => {
        // TODO: Use redux to store these responses as global states
        const figmaDocumentData = response.data.document;
        const figmaComponentsData = response.data.components;

        const figmaNodes = this.extractFigmaFileNodes(figmaDocumentData)
          .map((node) => {
            const rawDescription = figmaComponentsData[node.id].description;
            const matchKeywords = /(?:%KEYWORDS%)(.[^|]*)/g.exec(rawDescription) || rawDescription;
            const matchDescription = /(?:%DESCRIPTION%)(.[^|]*)/g.exec(rawDescription) || rawDescription;
            const keywords = matchKeywords[1].trim();
            const description = matchDescription[1].trim();
            // TODO: Fetch render imageUrl.
            // Figma API image endpoint is dead today. Will try again later.
            return ({
              ...node,
              keywords,
              description,
            });
          });

        this.setState({
          data: figmaNodes,
        });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <Page
        {...this.props}
      >
        {data.length ? (
          <Gallery
            items={data}
            itemProps={this.itemProps}
            defaultViewMode="grid"
            imageSize={200}
          />
        ) : (
          <Spinner size={SpinnerSize.large} />
        )}
      </Page>
    );
  }
}

Microsoft.propTypes = {
  title: PropTypes.string.isRequired,
  figmaFileKey: PropTypes.string.isRequired,
};

export default Microsoft;
