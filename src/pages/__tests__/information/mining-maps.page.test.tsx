import MiningMapPage from '@/pages/information/mining-maps.page';
import { render } from '@testing-library/react';

describe('Mining Maps Page', () => {
  it('should render', () => {
    const component = render(<MiningMapPage />);
    expect(component).toBeTruthy();
  });
});
