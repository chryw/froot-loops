import React from 'react';
import { Link, Image, ImageFit } from 'office-ui-fabric-react/lib/index';
import Gallery from '../../../Components/Gallery/Gallery';
import data from './assets/data.json';

const urlprefix = 'https://via.placeholder.com/500/dadada/000000';

const footerContent = (
  <div>
    <p>
      {'Some of these images are offered in various sizes and color schemes although only preview image is displayed in the catalog. The same usage restrictions apply to all variations of a given image. As part of a visual language, the images (or any part of the icons) must be used in a manner consistent with the image name or concept description.'}
    </p>
    <p>
      {'Download '}
      <Link href="http://download.microsoft.com/download/0/6/0/0607D8EA-9BB7-440B-A36A-A24EB8C9C67E/Visual%20Studio%202017%20Image%20Library%20EULA.RTF" download>
        {'Visual Studio 2017 Image Library EULA'}
      </Link>
    </p>
  </div>
);

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
  <Gallery
    items={data}
    itemType="icon"
    viewModes={['grid', 'list']}
    urlprefix={urlprefix}
    fieldNames={fieldNames}
    footerContent={footerContent}
  />
);

export default Vs2017;
