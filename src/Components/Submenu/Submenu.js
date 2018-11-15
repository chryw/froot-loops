import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'office-ui-fabric-react/lib/Link';
import './Submenu.css';

class Submenu extends React.Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
    };

    // Evaluate active item by comparing url
    this.isActiveItem = item => (item.url === document.location.pathname);

    // Render menu item
    this.renderMenuItem = (item, onItemClick) => {
      const {
        download,
        title,
        url,
      } = item;

      // Render download link
      if (download && url) {
        return (
          <Link
            href={url}
            download
          >
            {title}
          </Link>
        );
      }

      // Render regular link
      if (url) {
        return (
          <Link
            href={url}
          >
            {title}
          </Link>
        );
      }

      // Render button with interactive events
      if (onItemClick) {
        return (
          <button
            onClick={onItemClick}
            type="button"
          >
            {title}
          </button>
        );
      }
      return (
        { title }
      );
    };
  }

  render() {
    const {
      className,
      id,
      items,
      onItemClick,
    } = this.props;
    const { isExpanded } = this.state;
    return (
      <ul
        id={id}
        className={`Submenu ${className || ''}${isExpanded ? ' expanded' : ''}`}
      >
        {items.map(item => (
          <li
            className={`MenuItem${this.isActiveItem(item) ? ' active' : ''}`}
            key={`Submenu-MenuItem-${item.title}`}
          >
            {this.renderMenuItem(item, onItemClick)}
          </li>
        ))}
      </ul>
    );
  }
}

Submenu.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.object,
};

Submenu.defaultProps = {
  className: '',
};

export default Submenu;
