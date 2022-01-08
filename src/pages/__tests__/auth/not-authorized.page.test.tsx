import NotAuthorizedPage from '@/pages/auth/not-authorized.page';
import { render } from '@testing-library/react';

describe('Not Authorized Page', () => {
  it('should render', () => {
    const { getByText } = render(<NotAuthorizedPage />);
    expect(getByText('Not Authorized')).toBeTruthy();
  });
});
