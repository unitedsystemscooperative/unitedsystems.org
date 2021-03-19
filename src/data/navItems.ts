import { INavItem } from 'models/navItem';

export const navItems: INavItem[] = [
  { to: '/home', text: 'Home' },
  { to: '/about', text: 'About' },
  { to: '/information', text: 'Information' },
  { to: '/builds', text: 'USC Builds' },
  { to: '/massacres', text: 'Massacre Mission Tracker' },
  {
    to:
      'https://www.redbubble.com/people/UnitedSystemsCo/explore?asc=u&page=1&sortOrder=recent',
    text: 'Merch',
  },
  { to: '/join', text: 'Join' },
];
