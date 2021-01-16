import { IInfoButton } from 'models/information/infoButtonModel';

export const guidesList: IInfoButton[] = [
  {
    title: 'New Player Guide',
    caption: 'Created by Pixel Bandits',
    local: false,
    link:
      'https://www.pixelbandits.org/2020/04/elite-dangerous-beginners-guide/',
    beginner: true,
  },
  // {
  //   title: 'USC Ship Builds List',
  //   caption: 'Compiled by Admiralfeb',
  //   local: true,
  //   link: '/builds',
  //   beginner: true,
  // },
  {
    title: 'How to Explore',
    caption: "Commander's Toolbox",
    local: false,
    link: 'https://cmdrs-toolbox.com/guides/exploration',
    beginner: true,
  },
  {
    title: 'How to Mine',
    caption: 'Created by LocNor',
    local: false,
    link:
      'https://www.reddit.com/r/EliteDangerous/comments/4wmgja/general_mining_guide_20/',
    beginner: true,
  },
  {
    title: 'Ship Reviews',
    caption: 'Compiled by Admiralfeb',
    local: true,
    link: '/reviews',
    beginner: true,
  },
  {
    title: 'Mining Maps',
    caption: 'Compiled by Luisqa',
    local: true,
    link: '/mining',
    beginner: false,
  },
  {
    title: 'Cave Johnson',
    caption: 'Compiled by IM2D and Nullyti',
    local: true,
    link: '/cave-johnson',
    beginner: false,
  },
  {
    title: 'How to Unlock Engineers',
    caption: "Fox's Guide",
    local: false,
    link:
      'https://munkjensen.net/wiki/index.php?title=Fox%27s_step-by-step_Guide_to_Unlocking_Engineers_Quickly',
    beginner: false,
  },
  {
    title: 'How to unlock Guardian',
    caption: "Commander's Toolbox",
    local: false,
    link: 'https://cmdrs-toolbox.com/guides/guardian-modules',
    beginner: false,
  },
  {
    title: 'How to Grind Imperial and Federal Rank',
    caption: 'Reddit',
    local: false,
    link:
      'https://www.reddit.com/r/EliteDangerous/comments/g9y56s/psa_grind_how_to_get_federation_empire_rank_in_12/',
    beginner: false,
  },
];
