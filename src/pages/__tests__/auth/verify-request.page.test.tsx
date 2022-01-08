import VerifyRequestPage from '@/pages/auth/verify-request.page';
import { render } from '@testing-library/react';

describe('Verify Request Page', () => {
  it('should render', () => {
    const { getByText } = render(<VerifyRequestPage />);
    expect(getByText("Check your email for a 'magic' link to sign in.")).toBeTruthy();
  });
});
