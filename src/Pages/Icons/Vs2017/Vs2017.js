import React from 'react';
import { Link, Image, ImageFit } from 'office-ui-fabric-react/lib/index';
import Page from '../../../Components/Page/Page';
import Gallery from '../../../Components/Gallery/Gallery';
import data from './assets/data.json';

const urlprefix = 'https://via.placeholder.com/500/dadada/000000';

const itemProps = [
  {
    key: 'image',
    minWidth: 16,
    maxWidth: 16,
    isResizable: false,
    onRender: item => (
      <Image
        src={`${urlprefix}/${item.name}.svg`}
        alt={item.name}
        imageFit={ImageFit.fill}
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
    minWidth: 100,
    maxWidth: 300,
    isResizable: true,
    onRender: item => (
      `${item.keywords.join(', ')}`
    ),
  },
  {
    key: 'description',
    name: 'Description',
    fieldName: 'description',
    minWidth: 100,
    maxWidth: 500,
    isResizable: true,
  },
  {
    key: 'download-svg',
    name: 'Download SVG',
    iconProps: {
      iconName: 'Embed',
    },
    fieldName: 'download-svg',
    onRender: item => (
      <Link href={`${urlprefix}${item.name}_16x.svg`} download>
        {'Download SVG'}
      </Link>
    ),
  },
  {
    key: 'download-xaml',
    name: 'Download XAML',
    iconProps: {
      iconName: 'CodeEdit',
    },
    fieldName: 'download-xaml',
    onRender: item => (
      <Link href={`${urlprefix}${item.name}_16x.xaml`} download>
        {'Download XAML'}
      </Link>
    ),
  },
  {
    key: 'download-png',
    name: 'Download PNG',
    iconProps: {
      iconName: 'Photo2',
    },
    fieldName: 'download-png',
    onRender: item => (
      <Link href={`${urlprefix}${item.name}_16x.png`} download>
        {'Download PNG'}
      </Link>
    ),
  },
];

const Vs2017 = () => (
  <Page
    title="Visual Studio 2017 icons"
  >
    <Gallery
      items={data}
      urlprefix={urlprefix}
      itemProps={itemProps}
    />
  </Page>
);

export default Vs2017;
