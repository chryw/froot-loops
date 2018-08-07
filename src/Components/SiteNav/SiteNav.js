import React from 'react';
import { Icon, Link, DefaultButton } from 'office-ui-fabric-react/lib/index';

class SiteNav extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
    this.toggleNavMenu = this.toggleNavMenu.bind(this);
  }

  toggleNavMenu() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const { expanded } = this.state;
    const links = [
      {
        name: 'Home',
        url: '/',
      },
      {
        name: 'Icons',
        url: '/icons',
        items: [
          {
            name: 'VS 2017',
            url: '/icons/vs2017',
          },
          {
            name: 'VS Fluent',
            url: '/icons/vsfluent',
          },
          {
            name: 'VS Code',
            url: '/icons/vscode',
          },
          {
            name: 'VS Extension',
            url: 'icons/vsextensions',
          },
        ],
      },
      {
        name: 'Illustrations',
        url: '/illustrations',
      },
      {
        name: 'Brands',
        url: '/brands',
        items: [
          {
            name: 'Microsoft',
            url: 'brands/microsoft',
          },
          {
            name: 'Third party',
            url: 'brands/thirdparty',
          },
        ],
      },
    ];
    // TODO: make stateful component for menu items for active state
    return (
      <div className="SiteNav">
        <button
          className="SiteNav-button"
          onClick={this.toggleNavMenu}
          type="button"
        >
          <Icon iconName="GlobalNavButton" />
        </button>
        <ul
          className={`SiteNav-menu ${expanded ? 'expanded' : 'collapsed'}`}
        >
          {links.map(item => (
            <li key={item.url}>
              <Link
                href={item.url}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SiteNav;
