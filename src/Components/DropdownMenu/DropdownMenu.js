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
    this.onClick = (e) => {
      if (this.refDropdownMenu.contains(e.target)) {
        return;
      }
      this.onDismiss();
    };

    // Collapse menu if clicked outside
    this.onDismiss = () => {
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

  componentDidMount() {
    document.addEventListener('click', this.onClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick, false);
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
