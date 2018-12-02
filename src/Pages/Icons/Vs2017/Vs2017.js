import React from 'react';
import { Link, Image, ImageFit } from 'office-ui-fabric-react/lib/index';
import Page from '../../../Components/Page/Page';
import Gallery from '../../../Components/Gallery/Gallery';
import data from './assets/data.json';

const urlprefix = 'https://via.placeholder.com/500/dadada/000000';

const fieldNames = [
  {
    key: 'column1',
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
    key: 'column2',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column3',
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
    key: 'column4',
    name: 'Description',
    fieldName: 'description',
    minWidth: 100,
    maxWidth: 500,
    isResizable: true,
  },
  {
    key: 'column5',
    name: 'Downloads',
    onRender: item => (
      <ul className="DetailPane-downloadsList">
        <li className="DetailPane-downloadsListItem">
          <Link href={`${urlprefix}${item.name}.svg`} download>
            {'SVG'}
          </Link>
        </li>
        <li className="DetailPane-downloadsListItem">
          <Link href={`${urlprefix}${item.name}.png`} download>
            {'PNG'}
          </Link>
        </li>
        <li className="DetailPane-downloadsListItem">
          <Link href={`${urlprefix}${item.name}.xaml`} download>
            {'XAML'}
          </Link>
        </li>
      </ul>
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
      fieldNames={fieldNames}
    />
  </Page>
);

export default Vs2017;
