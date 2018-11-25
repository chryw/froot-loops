import React, { lazy } from 'react';

const AppState = {
  appTitle: 'D3 Assets',
  pages: [
    {
      key: 'home',
      title: 'Home',
      url: '/',
      component: lazy(() => import('./Pages/Home/Home')),
      isHomePage: true,
    },
    {
      key: 'icons',
      title: 'Icons',
      isCategory: true,
      pages: [
        {
          key: 'icons-vs2017',
          title: 'Visual Studio 2017 icons',
          url: '/icons/vs2017',
          component: lazy(() => import('./Pages/Icons/Vs2017/Vs2017')),
        },
        {
          key: 'icons-vsmac',
          title: 'Visual Studio for Mac icons',
          url: '/icons/vsmac',
          component: lazy(() => import('./Pages/Icons/VsMac/VsMac')),
        },
        {
          key: 'icons-vsfluent',
          title: 'Visual Studio 2019 (Fluent) icons',
          url: '/icons/vsfluent',
          dataurl: 'https://api.figma.com/v1/files/GzJ3fuqSE49GKT31ssOr7VZ8/nodes?ids=1%3A623',
          component: lazy(() => import('./Pages/Icons/VsFluent/VsFluent')),
        },
        {
          key: 'icons-vscode',
          title: 'Visual Studio Code icons',
          url: '/icons/vscode',
          component: lazy(() => import('./Pages/Icons/VsCode/VsCode')),
        },
        {
          key: 'icons-extension',
          title: 'Extension icons',
          url: '/icons/extension',
          component: lazy(() => import('./Pages/Icons/ExtensionIcons/ExtensionIcons')),
        },
      ],
    },
    {
      key: 'illustrations',
      title: 'Illustrations',
      isCategory: true,
      pages: [
        {
          key: 'illustrations-msftbrand',
          title: 'Brand illustrations',
          url: '/illustrations/msftbrand',
          component: lazy(() => import('./Pages/Illustrations/MsftBrand/MsftBrand')),
        },
        {
          key: 'illustrations-patterns',
          title: 'Patterns and textures',
          url: '/illustrations/patterns',
          component: lazy(() => import('./Pages/Illustrations/Patterns/Patterns')),
        },
        {
          key: 'illustrations-productshots',
          title: 'Product screenshots',
          url: '/illustrations/productshots',
          component: lazy(() => import('./Pages/Illustrations/ProductShots/ProductShots')),
        },
        {
          key: 'illustrations-diagrams',
          title: 'Diagrams and infographics',
          url: '/illustrations/diagrams',
          component: lazy(() => import('./Pages/Illustrations/Diagrams/Diagrams')),
        },
      ],
    },
    {
      key: 'brands',
      title: 'Brands',
      isCategory: true,
      pages: [
        {
          key: 'brands-microsoft',
          title: 'Microsoft brands',
          url: '/brands/microsoft',
          component: lazy(() => import('./Pages/Brands/Microsoft/Microsoft')),
        },
        {
          key: 'brands-partners',
          title: 'Partner brands',
          url: '/brands/partners',
          component: lazy(() => import('./Pages/Brands/Partners/Partners')),
        },
        {
          key: 'brands-internal',
          title: 'Internal brands',
          url: '/brands/internal',
          component: lazy(() => import('./Pages/Brands/Internal/Internal')),
        },
      ],
    },
  ],
};

export default AppState;
