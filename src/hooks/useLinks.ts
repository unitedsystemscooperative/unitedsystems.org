import {
  BlueprintLink,
  DiscordLink,
  PatreonLink,
  InaraCommodityLink,
  InaraSquadLink,
  MerchStore,
  YouTubeLink,
} from 'data/links';

export const useLinks = () => {
  return { ...links };
};

export const getLinks = () => {
  return { ...links };
};

const links = {
  inaraSquadLink: InaraSquadLink,
  discordLink: DiscordLink,
  patreonLink: PatreonLink,
  blueprints: BlueprintLink,
  inaraCommodity: InaraCommodityLink,
  merch: MerchStore,
  youtube: YouTubeLink,
};
