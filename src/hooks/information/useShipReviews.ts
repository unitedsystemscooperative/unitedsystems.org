import reviews from 'data/shipBuilds/shipMap.json';
import { sortItems } from 'functions/sort';
import { IShipReview } from 'models/information/shipReview';

export const useShipReviews = (): IShipReview[] => {
  const reviewList = reviews.map((review) => {
    const shipId = review.shipId;
    const name = review.name;
    const manufacturer = review.manufacturer;
    const shipReview = review.shipReview;
    return { shipId, name, manufacturer, shipReview };
  });
  return sortItems(reviewList, 'name');
};
