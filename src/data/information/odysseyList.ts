import { IInfoButton } from 'models/information/infoButtonModel';

export const odysseyList: IInfoButton[] = [
  {
    title: 'Engineers',
    caption: 'via Inara',
    local: false,
    link: 'https://inara.cz/engineers/#tab_engineerstype1',
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
