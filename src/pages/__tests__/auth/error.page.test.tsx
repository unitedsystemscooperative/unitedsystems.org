import AuthErrorPage from '@/pages/auth/error.page';
import { render } from '@testing-library/react';

describe('Auth Error Page', () => {
  it('should render', () => {
    const { getByText } = render(<AuthErrorPage />);
    expect(getByText('Sign In Failed')).toBeTruthy();
  });
});
