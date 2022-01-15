import OdyDeathPage from '@/pages/information/odyssey/death.page';
import { render } from '@testing-library/react';

describe('Odyssey Death Page', () => {
  it('should render', () => {
    const component = render(<OdyDeathPage />);
    expect(component).toBeTruthy();
  });
});
