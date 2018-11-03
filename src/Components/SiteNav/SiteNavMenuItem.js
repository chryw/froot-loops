import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Icon,
} from 'office-ui-fabric-react/lib/index';

class SiteNavMenuItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
      isSubmenuExpanded: false,
    };
    this.onMenuItemClick = () => {
      const { isActive } = this.state;
      this.setState({
        isActive: !isActive,
      });
    };
  }

  render() {
    const { isActive, isSubmenuExpanded } = this.state;
    const {
      name: lv1Name,
      url: lv1Url,
      submenuProps,
    } = this.props;
    let menuItemDom = '';
    if (submenuProps) {
      menuItemDom = (
        <button
          type="button"
          data-is-focusable
          onClick={this.onMenuItemClick}
          className={`SiteNav-menuItem ${isActive ? 'active' : ''}`}
        >
          <div>
            {lv1Name}
            <Icon iconName="ChevronDown" />
          </div>
          <div
            className={`SiteNav-submenu ${isSubmenuExpanded ? 'expanded' : ''}`}
          >
            {submenuProps.map((submenuItem) => {
              const {
                name: lv2Name,
                url: lv2Url,
              } = submenuItem;
              return (
                <Link
                  href={lv2Url}
                  className={`SiteNav-menuItem ${isActive ? 'active' : ''}`}
                  key={`SiteNavMenuItem-${lv2Name}`}
                >
                  <div>
                    {lv2Name}
                  </div>
                </Link>
              );
            })}
          </div>
        </button>
      );
    }
    if (lv1Url) {
      menuItemDom = (
        <Link
          href={lv1Url}
          data-is-focusable
          className={`SiteNav-menuItem ${isActive ? 'active' : ''}`}
        >
          <div>
            {lv1Name}
          </div>
        </Link>
      );
    }
    return menuItemDom;
  }
}

SiteNavMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  submenuProps: PropTypes.array,
};

SiteNavMenuItem.defaultProps = {
  url: '',
  submenuProps: [],
};

export default SiteNavMenuItem;
