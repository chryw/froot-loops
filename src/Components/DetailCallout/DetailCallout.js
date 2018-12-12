import React from 'react';
import PropTypes from 'prop-types';
import {
  Callout,
  CommandBar,
} from 'office-ui-fabric-react/lib/index';
import './DetailCallout.css';

const DetailCallout = (props) => {
  const {
    item,
    target,
    className,
    hidden,
  } = props;

  return (
    <Callout
      className={`DetailCallout ${className}`}
      gapSpace={0}
      target={target}
      role="tooltip"
      calloutWidth={250}
      hidden={hidden}
    >
      <div
        className="DetailCallout-header"
      >
        {item.name}
      </div>
      <div className="DetailCallout-body">
        <p>
          {item.description || 'Refer to icon name.'}
        </p>
      </div>
      <CommandBar
        items={[
          {
            key: 'svg',
            name: 'SVG',
            iconProps: {
              iconName: 'Embed',
            },
            href: `${item.name}_16x.svg`,
            download: true,
          },
          {
            key: 'png',
            name: 'PNG',
            iconProps: {
              iconName: 'Photo2',
            },
            href: `${item.name}_16x.png`,
            download: true,
          },
          {
            key: 'xaml',
            name: 'XAML',
            iconProps: {
              iconName: 'CodeEdit',
            },
            href: `${item.name}_16x.xaml`,
            download: true,
          },
        ]}
      />
    </Callout>
  );
};

DetailCallout.propTypes = {
  item: PropTypes.object.isRequired,
  target: PropTypes.object,
  className: PropTypes.string,
  hidden: PropTypes.bool.isRequired,
};

DetailCallout.defaultProps = {
  className: '',
  target: null,
};

export default DetailCallout;
