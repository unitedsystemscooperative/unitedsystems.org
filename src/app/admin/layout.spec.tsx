import { cleanup, render } from '@testing-library/react';
import AdminLayout from './layout';

describe('Admin Layout', () => {
  afterEach(cleanup);

  test('should render', () => {
    const result = render(<AdminLayout>child</AdminLayout>);

    expect(result).toBeTruthy();
  });
});
