import { render } from '@testing-library/react';
import { ShipReviews } from '../../components/shipReviews';

describe('Ship Reviews', () => {
  it('should render', () => {
    const component = render(<ShipReviews />);
    expect(component).toBeTruthy();
  });
});
