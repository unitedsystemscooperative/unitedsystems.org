import { cleanup, render } from '@testing-library/react';
import AboutLayout from './layout';

describe('about layout', () => {
  afterEach(cleanup);

  test('should render', () => {
    const result = render(<AboutLayout>child</AboutLayout>);

    expect(result).toBeTruthy();
  });
});
