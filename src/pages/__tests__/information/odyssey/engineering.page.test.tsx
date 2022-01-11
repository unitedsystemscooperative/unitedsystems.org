import OdyEngPage from '@/pages/information/odyssey/engineering.page';
import { render } from '@testing-library/react';

describe('Odyssey Engineering Page', () => {
  it('should render', () => {
    const component = render(<OdyEngPage />);
    expect(component).toBeTruthy();
  });
});
