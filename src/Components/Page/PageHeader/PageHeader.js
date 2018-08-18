import React from 'react';
import { Link } from 'office-ui-fabric-react/lib/index';
import PropTypes from 'prop-types';
import './PageHeader.css';

const PageHeader = (props) => {
  const { title, navItems } = props;
  return (
    <div className="PageHeader ms-Grid ms-bgColor-purple ms-fontColor-white">
      <h1 className="PageHeader-title ms-font-su">
        {title}
      </h1>
      <ul className="PageHeader-nav">
        {navItems.map(item => (
          <li
            className="PageHeader-navItem"
            key={item.url}
          >
            <Link href={item.url} title={item.name}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navItems: PropTypes.array,
};

PageHeader.defaultProps = {
  navItems: [],
};

export default PageHeader;
