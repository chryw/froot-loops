import React from 'react';
import { IconButton, Link } from 'office-ui-fabric-react/lib/index';
import './SiteNav.css';

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
        <div className="SiteNav-button ms-hiddenMdUp">
          <IconButton
            title="Toggle menu"
            ariaLabel="Toggle menu"
            iconProps={{ iconName: `${expanded ? 'Cancel' : 'GlobalNavButton'}` }}
            onClick={this.toggleNavMenu}
          />
        </div>
        <ul
          className={`SiteNav-menu ${expanded ? 'expanded' : 'collapsed'}`}
        >
          {links.map(item => (
            <li key={item.url} className="SiteNav-menuItem">
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
