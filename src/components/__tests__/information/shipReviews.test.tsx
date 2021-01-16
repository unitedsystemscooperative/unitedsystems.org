import { cleanup, render } from '@testing-library/react';
import { ShipReviews } from 'components/information';

describe('Ship Reviews', () => {
  afterEach(cleanup);

  it('should render', () => {
    render(<ShipReviews />);
  });
});
