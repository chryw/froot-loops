import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'office-ui-fabric-react/lib/Link';

const IconDetailTemplate = (props) => {
  const {
    id,
    name,
    keywords,
    description,
    urlprefix,
  } = props;
  return (
    <div key={`IconDetail_${id}`}>
      <h2 className="ms-font-xl">
        {'Keywords'}
      </h2>
      <p>
        {keywords.join(', ')}
      </p>
      <h2 className="ms-font-xl">
        {'Description'}
      </h2>
      <p>
        {description}
      </p>
      <h2 className="ms-font-xl">
        {'Downloads'}
      </h2>
      <ul className="DetailPane-downloadsList">
        <li className="DetailPane-downloadsListItem">
          <Link href={`${urlprefix}${name}.svg`} download>
            {'SVG'}
          </Link>
        </li>
        <li className="DetailPane-downloadsListItem">
          <Link href={`${urlprefix}${name}.png`} download>
            {'PNG'}
          </Link>
        </li>
        <li className="DetailPane-downloadsListItem">
          <Link href={`${urlprefix}${name}.xaml`} download>
            {'XAML'}
          </Link>
        </li>
      </ul>
    </div>
  );
};

IconDetailTemplate.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  keywords: PropTypes.array,
  description: PropTypes.string,
  urlprefix: PropTypes.string,
};

IconDetailTemplate.defaultProps = {
  id: -1,
  name: '',
  keywords: [],
  description: 'Refer to name.',
  urlprefix: '',
};

export { IconDetailTemplate };
