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

    this.onMenuButtonClick = () => {
      const { isMenuExpanded } = this.state;
      this.setState({
        isMenuExpanded: !isMenuExpanded,
      });
    };

    this.onCategoryButtonClick = (pageTitle) => {
      const target = document.getElementById(`SiteNav-SubMenu-${pageTitle}`);
      target.classList.toggle('expanded');
    };

    this.isActivePage = page => (page.url === document.location.pathname);
  }

  render() {
    const {
      pages,
    } = this.props;
    const {
      isMenuExpanded,
    } = this.state;

    return (
      <nav className="SiteNav">
        <IconButton
          className="ms-hiddenMdUp"
          iconProps={isMenuExpanded ? { iconName: 'Clear' } : { iconName: 'CollapseMenu' }}
          title="Menu button"
          ariaLabel="Menu button"
          onClick={this.onMenuButtonClick}
        />
        <ul
          className={`SiteNav-Menu ms-fadeIn100${isMenuExpanded ? ' expanded' : ''}`}
        >
          {pages.map(page => (
            <li
              className={`SiteNav-MenuItem${page.isHomePage ? ' home' : ''}${this.isActivePage(page) ? ' active' : ''}`}
              key={`SiteNav-MenuItem-${page.title}`}
            >
              {page.url ? (
                <Link href={page.url}>
                  {page.title}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => this.onCategoryButtonClick(page.title)}
                >
                  {page.title}
                  {page.isCategory ? (
                    <Icon iconName="ChevronDown" className="SiteNav-MenuItemChevron" />
                  ) : ''}
                </button>
              )}
              {page.isCategory && page.pages ? (
                <ul
                  id={`SiteNav-SubMenu-${page.title}`}
                  className="SiteNav-SubMenu"
                >
                  {page.pages.map(subPage => (
                    <li
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
