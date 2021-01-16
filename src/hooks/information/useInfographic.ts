import { infoGraphics } from 'data/information/infographicList';

export const useInfographic = (imgID: string) => {
  return infoGraphics.find((x) => x.id === imgID);
};
