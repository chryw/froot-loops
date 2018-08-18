import React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import Gallery from '../../../Components/Gallery/Gallery';
import data from './assets/data.json';
import eula from './assets/Visual_Studio_2017_Image_Library_EULA.RTF';


const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/500/dadada/000000';

const footerContent = (
  <div>
    <p>
      {'Some of these images are offered in various sizes and color schemes although only preview image is displayed in the table below. The same usage restrictions apply to all variations of a given image. As part of a visual language, the following images (or any part of the images) must be used in a manner consistent with the image name or concept description indicated below.'}
    </p>
    <p>
      <Link href={eula} download>
        {'Read Visual Studio 2017 Image Library EULA'}
      </Link>
    </p>
  </div>
);

const Vs2017 = () => (
  <Gallery itemType="icon" items={data} urlprefix={`${IMAGE_PLACEHOLDER}?text=Vs2017/`} footerContent={footerContent} />
);

export default Vs2017;
