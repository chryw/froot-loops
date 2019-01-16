const AppState = {
  appTitle: 'D3 Assets',
  pages: [
    {
      key: 'home',
      title: 'Home',
      url: '/',
      componentUrl: 'Home',
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
          componentUrl: 'Icons/Vs2017',
        },
        {
          key: 'icons-vsmac',
          title: 'Visual Studio for Mac icons',
          url: '/icons/vsmac',
          componentUrl: 'Icons/VsMac',
        },
        {
          key: 'icons-vsfluent',
          title: 'Visual Studio 2019 (Fluent) icons',
          url: '/icons/vsfluent',
          figmaFileKey: 'GzJ3fuqSE49GKT31ssOr7VZ8',
          componentUrl: 'Icons/VsFluent',
        },
        {
          key: 'icons-vscode',
          title: 'Visual Studio Code icons',
          url: '/icons/vscode',
          componentUrl: 'Icons/VsCode',
        },
        {
          key: 'icons-extension',
          title: 'Extension icons',
          url: '/icons/extension',
          componentUrl: 'Icons/ExtensionIcons',
        },
      ],
    },
    {
      key: 'illustrations',
      title: 'Illustrations',
      isCategory: true,
      pages: [
        {
          key: 'illustrations-microsoft',
          title: 'Microsoft style illustrations',
          url: '/illustrations/microsoft',
          // figmaFileKey: 'SKPcGX5caIw81qNokIfl3R', // Small file for development
          figmaFileKey: 'Ws6LxqCxVgkHQ1iE5vTjV2ON', // Real file for production
          componentUrl: 'Illustrations/Microsoft',
        },
        {
          key: 'illustrations-patterns',
          title: 'Patterns and textures',
          url: '/illustrations/patterns',
          componentUrl: 'Illustrations/Patterns',
        },
        {
          key: 'illustrations-productshots',
          title: 'Product screenshots',
          url: '/illustrations/productshots',
          componentUrl: 'Illustrations/ProductShots',
        },
        {
          key: 'illustrations-diagrams',
          title: 'Diagrams and infographics',
          url: '/illustrations/diagrams',
          componentUrl: 'Illustrations/Diagrams',
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
          componentUrl: 'Brands/Microsoft',
        },
        {
          key: 'brands-partners',
          title: 'Partner brands',
          url: '/brands/partners',
          componentUrl: 'Brands/Partners',
        },
        {
          key: 'brands-internal',
          title: 'Internal brands',
          url: '/brands/internal',
          componentUrl: 'Brands/Internal',
        },
      ],
    },
  ],
};

export default AppState;
