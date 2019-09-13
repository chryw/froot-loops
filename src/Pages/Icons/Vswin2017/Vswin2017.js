import React from 'react';
import {
  Spinner,
  SpinnerSize,
  Link,
  Image,
  ImageFit,
} from 'office-ui-fabric-react/lib/index';
import Page from '../../../Components/Page';
import Gallery from '../../../Components/Gallery';
import jsonData from './assets/data.json';
import './Vswin2017.css';

class Vswin2017 extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };

    this.urlprefix = `${process.env.PUBLIC_URL}/catalog/vswin-icons`;

    this.itemProps = [
      {
        key: 'image',
        minWidth: 16,
        maxWidth: 16,
        isResizable: false,
        onRender: item => (
          <Image
            src={`${this.urlprefix}/${item.imageUrl}`}
            alt={item.name}
            imageFit={ImageFit.contain}
            width={16}
            height={16}
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
        key: 'keywords',
        name: 'Keywords',
        fieldName: 'keywords',
        minWidth: 200,
        maxWidth: 200,
        isResizable: true,
        isMultiline: true,
        onRender: item => (
          `${item.keywords}`
        ),
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        isMultiline: true,
        minWidth: 200,
        isResizable: true,
      },
      {
        key: 'downloads',
        name: 'Downloads',
        minWidth: 200,
        maxWidth: 200,
        iconProps: {
          iconName: 'Embed',
        },
        fieldName: 'downloads',
        isResizable: true,
        onRender: item => (
          <div
            className="DetailsList-downloads"
          >
            <Link href={`${this.urlprefix}/${item.name}/${item.name}_16x.png`} download>
              {'PNG'}
            </Link>
            <Link href={`${this.urlprefix}/${item.name}/${item.name}_16x.svg`} download>
              {'SVG'}
            </Link>
            <Link href={`${this.urlprefix}/${item.name}/${item.name}_16x.xaml`} download>
              {'XAML'}
            </Link>
          </div>
        ),
      },
    ];
  }

  componentDidMount() {
    const data = jsonData.filter(item => item.publish);
    sessionStorage.setItem('Icons-Vswin2017-items', JSON.stringify(data));
    const cachedData = JSON.parse(sessionStorage.getItem('Icons-Vswin2017-items'));
    this.setState({
      data: cachedData,
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
            urlprefix={this.urlprefix}
            defaultViewMode="list"
            imageSize={100}
          />
        ) : (
          <Spinner size={SpinnerSize.large} />
        )}
      </Page>
    );
  }
}

export default Vswin2017;
