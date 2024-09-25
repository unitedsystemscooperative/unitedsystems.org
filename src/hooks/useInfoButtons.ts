import { uscLinksList } from '@/app/about/data';
import { docsList, guidesList, odysseyList, toolsList } from '@@/information/data';

export const useInfoButtons = () => {
  return { docsList, guidesList, toolsList, odysseyList, uscLinksList };
};
