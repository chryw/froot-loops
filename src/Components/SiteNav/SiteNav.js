import React from 'react';
import PropTypes from 'prop-types';
import './SiteNav.css';
import {
  IconButton,
  Icon,
  Link,
} from 'office-ui-fabric-react/lib/index';
import Submenu from '../Submenu/Submenu';

class SiteNav extends React.Component {
  constructor() {
    super();

    this.state = {
      isMenuExpanded: false,
    };

    // Toggle the menu when hamburger button is clicked
    this.onMenuButtonClick = () => {
      const { isMenuExpanded } = this.state;
      this.setState({
        isMenuExpanded: !isMenuExpanded,
      });
    };

    // Detect if clicked outside of SiteNav
    this.onSiteNavClick = (e) => {
      if (this.refSiteNav.contains(e.target)) {
        return;
      }
      this.onSiteNavClickOutside();
    };

    // Close the menu if clicked outside
    this.onSiteNavClickOutside = () => {
      this.setState({
        isMenuExpanded: false,
      });
    };

    // Toggle submenu when category item is clicked
    this.onCategoryButtonClick = (pageTitle) => {
      const target = document.getElementById(`Submenu-${pageTitle}`);
      target.classList.toggle('expanded');
    };

    // Check if the page is current active page by comparing url
    this.isActivePage = page => (page.url === document.location.pathname);
  }

  componentWillMount() {
    // Add listener to detect click inside or outside SiteNav element
    document.addEventListener('click', this.onSiteNavClick, false);
  }

  componentWillUnmount() {
    // Remove listener when no longer neede (actually useless? because SiteNav is always mounted...)
    document.removeEventListener('click', this.onSiteNavClick, false);
  }

  render() {
    const {
      pages,
    } = this.props;

    const {
      isMenuExpanded,
    } = this.state;

    return (
      <nav
        className="SiteNav"
        // This ref will be used for detecting click inside and outside
        ref={(node) => { this.refSiteNav = node; }}
      >
        {/* Button for toggling nav menu on mobile view */}
        <IconButton
          ariaLabel="Menu button"
          className="SiteNav-MenuButton ms-hiddenMdUp"
          iconProps={isMenuExpanded ? { iconName: 'Clear' } : { iconName: 'CollapseMenu' }}
          onClick={this.onMenuButtonClick}
          title="Menu button"
        />
        {/* Nav menu */}
        <ul
          className={`SiteNav-Menu${isMenuExpanded ? ' expanded' : ''}`}
        >
          {/* Iterate through pages */}
          {pages.map(page => (
            <li
              className={`SiteNav-MenuItem MenuItem${page.isHomePage ? ' home' : ''}${this.isActivePage(page) ? ' active' : ''}`}
              key={`SiteNav-MenuItem-${page.title}`}
              ref={(node) => { this.refMenuItem = node; }}
            >
              {page.url ? (
                // Render regular link
                <Link
                  href={page.url}
                >
                  {page.title}
                </Link>
              ) : (
                // Render button for category item
                <button
                  onClick={() => this.onCategoryButtonClick(page.title)}
                  type="button"
                >
                  {page.title}
                  <Icon
                    iconName="ChevronDown"
                    className="SiteNav-MenuItem-Chevron"
                  />
                </button>
              )}
              {page.isCategory && page.pages ? (
                // Render submenu for category item
                <Submenu
                  id={`Submenu-${page.title}`}
                  items={page.pages}
                />
              ) : ''}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

SiteNav.propTypes = {
  pages: PropTypes.array,
};

SiteNav.defaultProps = {
  pages: null,
};

export default SiteNav;
