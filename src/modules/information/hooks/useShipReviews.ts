import { genericSortArray } from '@/functions/sort';
import reviews from '@@/builds/data/shipMap.json';
import { IShipReview } from '@@/information/models/shipReview';

export const useShipReviews = (): IShipReview[] => {
  const reviewList = reviews.map((review) => {
    const shipId = review.shipId;
    const name = review.name;
    const manufacturer = review.manufacturer;
    const shipReview = review.shipReview;
    return { shipId, name, manufacturer, shipReview };
  });
  return genericSortArray(reviewList, { orderBy: 'name', order: 'asc' });
};
