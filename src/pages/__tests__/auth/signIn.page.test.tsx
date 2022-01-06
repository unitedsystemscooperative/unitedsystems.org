import SignInPage from '@/pages/auth/signIn.page';
import * as page from '@/pages/auth/signIn.page';
import { render, fireEvent, waitFor } from '@testing-library/react';
import * as authLib from 'next-auth/react';

const signInSpy = jest.spyOn(authLib, 'signIn').mockImplementation(jest.fn());

describe('SignIn Page', () => {
  it('should render', () => {
    const { getByText } = render(<SignInPage />);
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('should call signIn', async () => {
    const { getByTestId } = render(<SignInPage />);
    fireEvent.input(getByTestId('email').querySelector('input'), {
      target: { value: 'test@unitedsystems.org' },
    });
    fireEvent.click(getByTestId('email-submit'));

    await waitFor(() => {
      expect(signInSpy).toHaveBeenCalled();
    });
  });

  it('should not call signIn if email not entered', async () => {
    const { getByTestId } = render(<SignInPage />);
    fireEvent.click(getByTestId('email-submit'));

    await waitFor(
      () => {
        expect(signInSpy).not.toHaveBeenCalled();
      },
      { timeout: 500 }
    );
  });
});
