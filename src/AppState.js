const AppState = {
  appTitle: 'D3 Assets',
  pages: [
    {
      title: 'Icons',
      component: require('./Pages/Icons/Icons'),
      isCategory: true,
      pages: [
        {
          title: 'Visual Studio 2017',
          url: '/icons/vs2017',
        },
        {
          title: 'Visual Studio 2019 (Fluent)',
          url: '/icons/vsfluent',
        },
        {
          title: 'Visual Studio Code',
          url: '/icons/vscode',
        },
      ]
    },
    {
      title: 'Illustrations',
      isCategory: true,
      component: require('./Pages/Illustrations/Illustrations'),
      pages: [
        {
          title: 'Microsoft style',
          url: '/illustrations/microsoft',
        },
        {
          title: 'Background patterns',
          url: '/illustrations/patterns',
        },
        {
          title: 'Product shots',
          url: '/illustrations/productshots',
        },
        {
          title: 'Diagrams and infographics',
          url: '/illustrations/diagrams',
        },
      ],
    },
    {
      title: 'Brands',
      isCategory: true,
      component: require('./Pages/Brands/Brands'),
      pages: [
        {
          title: 'Microsoft',
          url: '/brands/microsoft',
        },
        {
          title: 'Partners',
          url: '/brands/partners',
        },
        {
          title: 'Internal brands',
          url: '/brands/internal',
        },
        {
          title: 'Extension icons',
          url: '/brands/extensions',
        },
      ],
    },
  ],
};

export default AppState;
