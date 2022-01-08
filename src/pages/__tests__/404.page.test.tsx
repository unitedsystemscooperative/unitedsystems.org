import { render } from '@testing-library/react';
import NotFoundPage from '../404.page';

describe('Not Found Page', () => {
  it('should render', () => {
    const { getByText } = render(<NotFoundPage />);
    expect(getByText('Mistakes were made')).toBeTruthy();
  });
});
