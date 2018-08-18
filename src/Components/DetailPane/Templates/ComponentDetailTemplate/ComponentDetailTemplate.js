import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'office-ui-fabric-react/lib/Link';

const ComponentDetailTemplate = (props) => {
  const {
    id,
    name,
    keywords,
    description,
    urlprefix,
  } = props;
  return (
    <div key={`IconDetail_${id}`}>
      <h2>
        {'Keywords'}
      </h2>
      <p>
        {keywords.join(', ')}
      </p>
      <h2>
        {'Description'}
      </h2>
      <p>
        {description}
      </p>
      <h2>
        {'Downloads'}
      </h2>
      <ul className="IconDetail-downloadsList">
        <li className="IconDetail-downloadsListItem">
          <Link href={`${urlprefix}/${name}.svg`}>
            {'SVG'}
          </Link>
        </li>
        <li className="IconDetail-downloadsListItem">
          <Link href={`${urlprefix}/${name}.png`}>
            {'PNG'}
          </Link>
        </li>
        <li className="IconDetail-downloadsListItem">
          <Link href={`${urlprefix}/${name}.xaml`}>
            {'XAML'}
          </Link>
        </li>
      </ul>
    </div>
  );
};

ComponentDetailTemplate.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  keywords: PropTypes.array,
  description: PropTypes.string,
  urlprefix: PropTypes.string,
};

ComponentDetailTemplate.defaultProps = {
  keywords: [],
  description: 'Refer to name.',
  urlprefix: '',
};

export { ComponentDetailTemplate };
