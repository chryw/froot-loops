import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Icon,
  DefaultButton,
} from 'office-ui-fabric-react/lib/index';
import './DropdownMenu.css';

class DropdownMenu extends React.Component {
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

    // Detect if clicked outside of DropdownMenu
    this.onDropdownMenuClick = (e) => {
      if (this.refDropdownMenu.contains(e.target)) {
        return;
      }
      this.onDropdownMenuClickOutside();
    };

    // Collapse menu if clicked outside
    this.onDropdownMenuClickOutside = () => {
      this.setState({
        isExpanded: false,
      });
    };

    // Toggle menu on button click
    this.onButtonClick = () => {
      const { isExpanded } = this.state;
      this.setState({
        isExpanded: !isExpanded,
      });
    };
  }

  componentWillMount() {
    // Add listener to detect click inside or outside of the DOM element
    document.addEventListener('click', this.onDropdownMenuClick, false);
  }

  componentWillUnmount() {
    // Remove listener when no longer needed
    document.removeEventListener('click', this.onDropdownMenuClick, false);
  }

  render() {
    const {
      label,
      className,
      items,
      onItemClick,
    } = this.props;
    const { isExpanded } = this.state;
    return (
      <div
        className={`DropdownMenu ${className || ''}`}
        ref={(node) => { this.refDropdownMenu = node; }}
      >
        <DefaultButton
          onClick={this.onButtonClick}
        >
          {label}
          <Icon
            iconName={`${isExpanded ? 'ChevronUp' : 'ChevronDown'}`}
            className="DropdownMenu-Chevron"
          />
        </DefaultButton>
        <ul
          className="DropdownMenu-Menu"
          aria-expanded={isExpanded}
        >
          {items.map(item => (
            <li
              className={`DropdownMenu-Item${this.isActiveItem(item) ? ' active' : ''}`}
              key={`DropdownMenu-Item-${item.title}`}
            >
              {this.renderMenuItem(item, onItemClick)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.object,
};

DropdownMenu.defaultProps = {
  className: '',
};

export default DropdownMenu;
