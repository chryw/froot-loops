import React from 'react';
import PropTypes from 'prop-types';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import './DetailPane.css';

const DetailPane = (props) => {
  const {
    header,
    imagesrc,
    children,
    footerContent,
  } = props;
  return (
    <div className="DetailPane">
      <h1 className="DetailPane-header ms-font-xxl ms-fontWeight-semibold">
        {header}
      </h1>
      {imagesrc.length ? (
        <div className="DetailPane-image">
          <Image
            src={imagesrc}
            imageFit={ImageFit.fit}
            width="100%"
            height="100%"
          />
        </div>
      ) : null}
      <div className="DetailPane-body">
        {children}
      </div>
      <div className="DetailPane-footer">
        {footerContent}
      </div>
    </div>
  );
};

DetailPane.propTypes = {
  header: PropTypes.string,
  imagesrc: PropTypes.string,
  children: PropTypes.any,
  footerContent: PropTypes.object,
};

DetailPane.defaultProps = {
  header: '',
  imagesrc: '',
  children: '',
  footerContent: {},
};

export default DetailPane;
