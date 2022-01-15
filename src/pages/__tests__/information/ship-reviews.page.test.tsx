import ShipReviewsPage from '@/pages/information/ship-reviews.page';
import { render } from '@testing-library/react';

describe('Ship Reviews Page', () => {
  it('should render', () => {
    const component = render(<ShipReviewsPage />);
    expect(component).toBeTruthy();
  });
});
