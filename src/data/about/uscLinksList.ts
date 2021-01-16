import { IInfoButton } from 'models/information/infoButtonModel';
import { getLinks } from 'hooks/useLinks';
const { inaraSquadLink, discordLink, patreonLink } = getLinks();
export const uscLinksList: IInfoButton[] = [
  {
    title: 'Rules',
    caption: '',
    local: true,
    link: '/about?x=rules',
    beginner: true,
  },
  // {
  //   title: 'Our Management',
  //   caption: '',
  //   local: true,
  //   link: '/about?x=rules',
  //   beginner: true,
  // },
  {
    title: 'Our Allies',
    caption: '',
    local: true,
    link: '/about?x=allies',
    beginner: true,
  },
  {
    title: 'Our Faction',
    caption: '',
    local: true,
    link: '/about?x=faction',
    beginner: true,
  },
  {
    title: 'Our Fleet Carriers',
    caption: '',
    local: true,
    link: '/about?x=fc',
    beginner: true,
  },
  {
    title: 'Discord',
    caption: '',
    local: false,
    link: discordLink,
    beginner: false,
  },
  {
    title: 'Facebook',
    caption: '',
    local: false,
    link: 'https://www.facebook.com/unitedsystemscooperative',
    beginner: false,
  },
  {
    title: 'Inara USC Squadron',
    caption: '',
    local: false,
    link: inaraSquadLink,
    beginner: false,
  },
  {
    title: 'Patreon',
    caption: '',
    local: false,
    link: patreonLink,
    beginner: false,
  },
];
