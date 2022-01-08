import { render } from '@testing-library/react';
import MerchLandingPage from '../merch.page';

describe('Merch Page', () => {
  it('should render', () => {
    const component = render(<MerchLandingPage />);
    expect(component).toBeTruthy();
  });
});
