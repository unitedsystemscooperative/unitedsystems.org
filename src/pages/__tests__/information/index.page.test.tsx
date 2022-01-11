import InformationPage from '@/pages/information/index.page';
import { render } from '@testing-library/react';

describe('Information Page', () => {
  xit('should render', () => {
    const component = render(<InformationPage />);
    expect(component).toBeTruthy();
  });
});
