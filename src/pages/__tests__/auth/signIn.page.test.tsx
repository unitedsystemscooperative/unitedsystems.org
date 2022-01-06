import SignInPage, { getServerSideProps } from '@/pages/auth/signIn.page';
import { fireEvent, render, waitFor } from '@testing-library/react';
import * as authLib from 'next-auth/react';

const signInSpy = jest.spyOn(authLib, 'signIn').mockImplementation(jest.fn());
const getSessionSpy = jest.spyOn(authLib, 'getSession').mockImplementation(jest.fn());

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

  describe('getServerSideProps', () => {
    it('should return empty if not logged in', async () => {
      getSessionSpy.mockResolvedValue(undefined);

      const result = await getServerSideProps({
        req: null,
        res: null,
        query: { redirect: 'admin_index' },
        resolvedUrl: '',
      });

      expect(result).toEqual({ props: {} });
    });
    it('should return the redirect if logged in', async () => {
      getSessionSpy.mockResolvedValue({ expires: '500' });

      const result = await getServerSideProps({
        req: null,
        res: null,
        query: { redirect: 'admin_index' },
        resolvedUrl: '',
      });

      expect(result).toEqual({ redirect: { destination: '/admin', permanent: false } });
    });
    it('should return the redirect to home if redirect is not found if logged in', async () => {
      getSessionSpy.mockResolvedValue({ expires: '500' });

      const result = await getServerSideProps({
        req: null,
        res: null,
        query: { redirect: 'test_redirect' },
        resolvedUrl: '',
      });

      expect(result).toEqual({ redirect: { destination: '/home', permanent: false } });
    });
  });
});
