import { render } from '@testing-library/react';
import HomePage from '../home.page';

describe('Home Page', () => {
  it('should render', () => {
    const component = render(<HomePage />);
    expect(component).toBeTruthy();
  });
});
