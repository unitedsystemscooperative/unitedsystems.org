import { getLinks } from '@/hooks/useLinks';
import { IInfoButton } from '../information/_models/infoButtonModel';
const { inaraSquadLink, discordLink, patreonLink, youtube } = getLinks();

export const uscLinksList: Omit<IInfoButton, 'beginner'>[] = [
  {
    title: 'Rules',
    caption: '',
    local: true,
    link: '/about/rules',
  },
  // {
  //   title: 'Our Management',
  //   caption: '',
  //   local: true,
  //   link: '/about/rules',
  // },
  {
    title: 'Our Allies',
    caption: '',
    local: true,
    link: '/about/allies',
  },
  {
    title: 'Our Faction',
    caption: '',
    local: true,
    link: '/about/faction',
  },
  {
    title: 'Our Fleet Carriers',
    caption: '',
    local: true,
    link: '/about/fc',
  },
  {
    title: 'Discord',
    caption: '',
    local: false,
    link: discordLink,
  },
  {
    title: 'Facebook',
    caption: '',
    local: false,
    link: 'https://www.facebook.com/unitedsystemscooperative',
  },
  {
    title: 'Inara USC Squadron',
    caption: '',
    local: false,
    link: inaraSquadLink,
  },
  {
    title: 'Patreon',
    caption: '',
    local: false,
    link: patreonLink,
  },
  {
    title: 'YouTube',
    caption: '',
    local: false,
    link: youtube,
  },
];
