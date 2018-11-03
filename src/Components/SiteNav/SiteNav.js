import React from 'react';
import {
  FocusZone,
  IconButton,
} from 'office-ui-fabric-react/lib/index';
import './SiteNav.css';
import SiteNavMenuItemsData from './SiteNavMenuItemsData';
import SiteNavMenuItem from './SiteNavMenuItem';

class SiteNav extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      items: SiteNavMenuItemsData,
    };

    this.toggleNavMenu = () => {
      const { expanded } = this.state;
      this.setState({
        expanded: !expanded,
      });
    };
  }

  render() {
    const {
      expanded,
      items,
    } = this.state;

    return (
      <FocusZone className="SiteNav">
        <IconButton
          className="SiteNav-button ms-hiddenMdUp"
          title="Toggle menu"
          ariaLabel="Toggle menu"
          iconProps={{ iconName: `${expanded ? 'Cancel' : 'GlobalNavButton'}` }}
          onClick={this.toggleNavMenu}
          data-is-focusable
        />
        <div
          className={`SiteNav-menu ${expanded ? 'expanded' : 'collapsed'}`}
        >
          {items.map((item) => {
            const { name } = item;
            return (
              <SiteNavMenuItem
                key={`SiteNavMenuItem-${name}`}
                {...item}
              />
            );
          })}
        </div>
      </FocusZone>
    );
  }
}

export default SiteNav;
