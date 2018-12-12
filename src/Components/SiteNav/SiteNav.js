import React from 'react';
import PropTypes from 'prop-types';
import './SiteNav.css';
import {
  IconButton,
  Link,
  DefaultButton,
} from 'office-ui-fabric-react/lib/index';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import SpriteImage from '../SpriteImage/SpriteImage';
import { ReactComponent as ImageSprite } from './assets/sprite.svg';

class SiteNav extends React.Component {
  constructor() {
    super();

    this.state = {
      isMenuExpanded: false,
    };

    // Toggle the menu when hamburger button is clicked
    this.onMobileButtonClick = () => {
      const { isMenuExpanded } = this.state;
      this.setState({
        isMenuExpanded: !isMenuExpanded,
      });
    };

    // Detect if clicked outside of SiteNav
    this.onSiteNavClick = (e) => {
      if (this.siteNavRef.current.contains(e.target)) {
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

    // Check if the page is current active page by comparing url
    this.isActivePage = page => (page.url === document.location.pathname);
  }

  componentWillMount() {
    // Create ref
    this.siteNavRef = React.createRef();

    // Add listener to detect click inside or outside SiteNav element
    document.addEventListener('click', this.onSiteNavClick, false);
  }

  componentWillUnmount() {
    // Remove listener when no longer needed
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
        ref={this.siteNavRef}
      >
        {/* Put brand image sprite in DOM. Refered via symbol id. */}
        <ImageSprite
          style={{
            display: 'none',
          }}
        />
        {/* Button for toggling nav menu on mobile view */}
        <IconButton
          ariaLabel="Menu button"
          className="SiteNav-MobileButton ms-hiddenMdUp"
          iconProps={isMenuExpanded ? { iconName: 'Clear' } : { iconName: 'GlobalNavButton' }}
          onClick={this.onMobileButtonClick}
          title="Menu button"
        />
        <div
          className="SiteNav-Brand"
        >
          {/* Microsoft Logo | Redirects to microsoft.com */}
          <Link
            href="https://www.microsoft.com/"
            target="_blank"
            className="MicrosoftLogo"
          >
            <SpriteImage name="BrandMicrosoft_mark" />
          </Link>
          {/* D3 Assets logo | Home */}
          <Link
            href="/"
            className="D3AssetsLogo"
          >
            <SpriteImage name="BrandD3Assets" />
          </Link>
        </div>
        {/* Nav menu */}
        <ul
          className="SiteNav-Menu"
          aria-expanded={isMenuExpanded}
        >
          {/* Iterate through pages */}
          {pages.map(page => (
            <li
              className={`SiteNav-MenuItem${page.isHomePage ? ' home' : ''}${this.isActivePage(page) ? ' active' : ''}`}
              key={`SiteNav-MenuItem-${page.title}`}
            >
              {page.url ? (
                // Render regular link
                <DefaultButton
                  href={page.url}
                  text={page.title}
                />
              ) : (
                <DropdownMenu
                  label={page.title}
                  className="SiteNav-Submenu"
                  items={page.pages}
                />
              )}
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
