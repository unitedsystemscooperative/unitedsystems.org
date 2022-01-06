import { render } from '@testing-library/react';
import DevPage from '../dev.page';

describe('Dev Page', () => {
  it('should render', () => {
    const component = render(<DevPage />);
    expect(component).toBeTruthy();
  });
});
