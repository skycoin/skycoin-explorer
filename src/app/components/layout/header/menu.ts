/**
 * Data for building the navigation menu. Used by the header and the footer.
 *
 * Each item could be a link to a section of the Skycoin website or a submenu.
 * The properties of the items are:
 * name: Name to show in the menu.
 * href: The URL the item opens (ignored if the item is a submenu).
 * active: If the item corresponds to the page that is currenly being shown (the explorer).
 * target: Value for the taget property of the <a> tag, if the item is not a submenu.
 * menu: if the item is a submenu, an array with more items.
 * open: if the item is a submenu, indicates if the submenu is open (must be set to false).
 */
export default [
  {
    name: 'Downloads',
    href: 'https://www.skycoin.net/downloads',
    active: false,
    target: '_blank',
    open: false,
  },
  {
    name: 'Ecosystem',
    open: false,
    active: false,
    menu: [
      {
        name: 'Overview',
        href: 'https://www.skycoin.net/ecosystem',
        active: false,
        target: '_blank',
        open: false,
      },
      {
        name: 'Skywire',
        href: 'https://www.skycoin.net/skywire',
        active: false,
        target: '_blank',
        open: false,
      },
      {
        name: 'Obelisk',
        href: 'https://www.skycoin.net/obelisk',
        active: false,
        target: '_blank',
        open: false,
      },
      {
        name: 'Fiber',
        href: 'https://www.skycoin.net/fiber',
        active: false,
        target: '_blank',
        open: false,
      },
      {
        name: 'CX',
        href: 'https://www.skycoin.net/cx',
        active: false,
        target: '_blank',
        open: false,
      },
      {
        name: 'CXO',
        href: 'https://www.skycoin.net/cxo',
        active: false,
        target: '_blank',
        open: false,
      },
    ],
  },
  {
    name: 'Skyminer',
    href: 'https://www.skycoin.net/skyminer',
    active: false,
    target: '_blank',
    open: false,
  },
  {
    name: 'Blog',
    href: 'https://www.skycoin.net/blog/',
    active: false,
    target: '_blank',
    open: false,
  },
  {
    name: 'Store',
    open: false,
    active: false,
    menu: [
      {
        name: 'Hardware store',
        href: 'https://store.skycoin.net/',
        active: false,
        target: '_blank',
        open: false,
      },
      {
        name: 'Merchandise store',
        href: 'https://merch.skycoin.net/',
        active: false,
        target: '_blank',
        open: false,
      },
    ],
  },
  {
    name: 'Other',
    open: false,
    active: true,
    menu: [
      {
        name: 'Team',
        href: 'https://www.skycoin.net/team',
        active: false,
        target: '_blank',
        open: false,
      },
      {
        name: 'Gallery',
        href: 'https://www.skycoin.net/gallery',
        active: false,
        target: '_blank',
        open: false,
      },
      {
        name: 'Jobs',
        href: 'https://www.skycoin.net/jobs',
        active: false,
        target: '_blank',
        open: false,
      },
      {
        name: 'Explorer',
        href: '/',
        active: true,
        target: '_self',
        open: false,
      },
      {
        name: 'Explorer API',
        href: 'https://explorer.skycoin.net/api.html',
        active: false,
        target: '_blank',
        open: false,
      },
    ],
  },
];
