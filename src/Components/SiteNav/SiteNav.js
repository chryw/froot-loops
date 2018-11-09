import React from 'react';
import PropTypes from 'prop-types';
import './SiteNav.css';
import {
  IconButton,
  Icon,
  Link,
} from 'office-ui-fabric-react/lib/index';

class SiteNav extends React.Component {
  constructor() {
    super();

    this.state = {
      isMenuExpanded: false,
    };

    // Detect if clicked inside or outside
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

    // Toggle the menu when hamburger button is clicked
    this.onMenuButtonClick = () => {
      const { isMenuExpanded } = this.state;
      this.setState({
        isMenuExpanded: !isMenuExpanded,
      });
    };

    // Toggle submenu when category item is clicked
    this.onCategoryButtonClick = (pageTitle) => {
      const target = document.getElementById(`SiteNav-SubMenu-${pageTitle}`);
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
          className="ms-hiddenMdUp"
          iconProps={isMenuExpanded ? { iconName: 'Clear' } : { iconName: 'CollapseMenu' }}
          title="Menu button"
          ariaLabel="Menu button"
          onClick={this.onMenuButtonClick}
        />
        {/* Nav menu */}
        <ul
          className={`SiteNav-Menu ms-fadeIn100${isMenuExpanded ? ' expanded' : ''}`}
        >
          {/* Iterate through pages */}
          {pages.map(page => (
            <li
              className={`SiteNav-MenuItem${page.isHomePage ? ' home' : ''}${this.isActivePage(page) ? ' active' : ''}`}
              key={`SiteNav-MenuItem-${page.title}`}
            >
              {page.url ? (
                // Render regular link
                <Link href={page.url}>
                  {page.title}
                </Link>
              ) : (
                // Render button for category item
                <button
                  type="button"
                  onClick={() => this.onCategoryButtonClick(page.title)}
                >
                  {page.title}
                  {page.isCategory ? (
                    // Render chevron icon for category item
                    <Icon iconName="ChevronDown" className="SiteNav-MenuItemChevron" />
                  ) : ''}
                </button>
              )}
              {page.isCategory && page.pages ? (
                // Render submenu for category item
                <ul
                  id={`SiteNav-SubMenu-${page.title}`}
                  className="SiteNav-SubMenu"
                >
                  {/* Iterate through subpages */}
                  {page.pages.map(subPage => (
                    <li
                      // Toggle active style for current page
                      className={`SiteNav-SubMenuItem${this.isActivePage(subPage) ? ' active' : ''}`}
                      key={`SiteNav-SubMenuItem-${subPage.title}`}
                    >
                      <Link
                        href={subPage.url}
                      >
                        {subPage.title}
                      </Link>
                    </li>
                  ))}
                </ul>
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
