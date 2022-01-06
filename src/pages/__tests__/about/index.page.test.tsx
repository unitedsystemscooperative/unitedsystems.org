import AboutPage from '@/pages/about/index.page';
import { render } from '@testing-library/react';

describe('About Page', () => {
  it('should render', () => {
    const component = render(<AboutPage />);
    expect(component).toBeTruthy();
  });
});
