import { cleanup, render } from '@testing-library/react';
import AboutPage from './page';

describe('about page', () => {
  afterEach(cleanup);

  test('should render', () => {
    const result = render(<AboutPage />);

    expect(result).toBeTruthy();
  });
});
