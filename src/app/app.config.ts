export const QrConfig = {
  prefix: 'skycoin:',
};

export const HeaderConfig = {
  useGenericHeader: false,
  genericHeaderUrl: 'https://www.skycoin.net/',
};

export const FooterConfig = {
  useGenericFooter: false,
  contactLinks: [
    {
      url: 'https://www.skycoin.net/',
      content: '<i class="fab fa-github"></i>',
    } , {
      url: 'https://www.skycoin.net/',
      content: '<i class="fab fa-telegram"></i>',
    } , {
      url: 'https://www.skycoin.net/',
      content: '<i class="fab fa-twitter"></i>',
    } , {
      url: 'https://www.skycoin.net/',
      content: '<i class="fab fa-youtube"></i>',
    } , {
      url: 'https://www.skycoin.net/',
      content: '<i class="fab fa-discord"></i>',
    } , {
      url: 'https://www.skycoin.net/',
      content: '<i class="fab fa-instagram"></i>',
    } , {
      url: 'https://www.skycoin.net/',
      content: '<i class="fab fa-reddit"></i>',
    }
  ],
};

export const languageConfig = {
  languages: [{
      code: 'en',
      name: 'English',
      iconName: 'en.png'
    },
    {
      code: 'es',
      name: 'Español',
      iconName: 'es.png'
    },
    {
      code: 'zh',
      name: '中文',
      iconName: 'zh.png'
    }
  ],
  defaultLanguage: 'en'
};
