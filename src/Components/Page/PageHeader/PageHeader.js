import React from 'react';
import { Link } from 'office-ui-fabric-react/lib/index';
import PropTypes from 'prop-types';

const PageHeader = (props) => {
  const { title, intro, navItems } = props;
  return (
    <div className="PageHeader ms-Grid ms-bgColor-purple ms-fontColor-white">
      <h1 className="PageHeader-title ms-font-su">
        {title}
      </h1>
      <div className="PageHeader-intro">
        {intro}
      </div>
      <ul className="PageHeader-topics">
        {navItems.map(item => (
          <li key={item.url}>
            <Link href={item.url}>
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
  intro: PropTypes.object,
  navItems: PropTypes.array,
};

PageHeader.defaultProps = {
  intro: {},
  navItems: [],
};

export default PageHeader;
