import { IInfoButton } from '@@/information/models/infoButtonModel';

export const odysseyList: IInfoButton[] = [
  {
    title: 'Engineers',
    caption: 'via Inara',
    local: false,
    link: 'https://inara.cz/engineers/#tab_engineerstype1',
    beginner: true,
  },
  {
    title: 'Guide to Planetary Exobiology',
    caption: 'via Reddit',
    local: false,
    link: 'https://www.reddit.com/r/EliteDangerous/comments/nohsyt/a_brief_guide_to_planetary_exobiology/',
    beginner: true,
  },
  {
    title: 'Death',
    caption: 'What happens?',
    local: true,
    link: 'odyssey/death',
    beginner: true,
  },
  {
    title: 'Engineering',
    caption: "What's different?",
    local: true,
    link: 'odyssey/engineering',
    beginner: true,
  },
  {
    title: 'Ship to Ground Combat',
    caption: 'Be Prepared!',
    local: true,
    link: 'odyssey/s2gcombat',
    beginner: true,
  },
];
