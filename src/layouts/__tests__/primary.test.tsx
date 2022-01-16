import { PrimaryLayout } from '@/layouts';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/styles';
import { render, fireEvent } from '@testing-library/react';
import * as useAdmin from '@/hooks/useAdmin';
import * as auth from 'next-auth/react';
import * as router from 'next/router';
import { createMatchMedia } from '@/__mocks__/mediaquery';

const useAdminSpy = jest.spyOn(useAdmin, 'useAdmin');
const useSessionSpy = jest
  .spyOn(auth, 'useSession')
  .mockReturnValue({ status: 'unauthenticated', data: null });
const signOutSpy = jest
  .spyOn(auth, 'signOut')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .mockImplementation(jest.fn().mockImplementation(() => {}));
const useRouterSpy = jest.spyOn(router, 'useRouter');

const TestComponent = () => (
  <ThemeProvider theme={theme}>
    <PrimaryLayout version="test1">
      <div>content</div>
    </PrimaryLayout>
  </ThemeProvider>
);

describe('Primary Layout', () => {
  beforeEach(() => {
    useRouterSpy.mockImplementation(
      jest.fn().mockReturnValue({
        route: '/',
        pathname: '/home',
        query: null,
        asPath: '',
      })
    );
  });
  describe('Full Screen', () => {
    beforeEach(() => {
      window.matchMedia = createMatchMedia(1200);
    });
    it('should render full screen', () => {
      useAdminSpy.mockReturnValue(false);
      useSessionSpy.mockReturnValue({ status: 'unauthenticated', data: null });
      const { getByTestId, getByText } = render(<TestComponent />);
      expect(getByTestId('full-nav')).toBeTruthy();
      expect(getByText('Version: test1')).toBeTruthy();
    });

    it('should show/hide the Admin shortcut', () => {
      useAdminSpy.mockReturnValue(false);
      useSessionSpy.mockReturnValue({ status: 'unauthenticated', data: null });
      const { rerender, queryByTestId } = render(<TestComponent />);

      expect(queryByTestId('full-admin')).toBeNull();
      useAdminSpy.mockReturnValue(true);
      rerender(<TestComponent />);

      expect(queryByTestId('full-admin')).toBeTruthy();
    });
    it('should show/hide the Sign out button', () => {
      useAdminSpy.mockReturnValue(false);
      useSessionSpy.mockReturnValue({ status: 'authenticated', data: null });
      const { rerender, queryByTestId } = render(<TestComponent />);

      expect(queryByTestId('full-signout')).toBeTruthy();
      useSessionSpy.mockReturnValue({ status: 'unauthenticated', data: null });
      rerender(<TestComponent />);

      expect(queryByTestId('full-signout')).toBeNull();
    });
    it('should call signOut', () => {
      useAdminSpy.mockReturnValue(false);
      // (useSession as jest.Mock).mockReturnValue({ status: 'authenticated' });
      useSessionSpy.mockReturnValue({ status: 'authenticated', data: null });
      const { queryByTestId } = render(<TestComponent />);

      fireEvent.click(queryByTestId('full-signout'));
      expect(signOutSpy).toHaveBeenCalled();
    });
  });

  describe('Mobile', () => {
    beforeEach(() => {
      window.matchMedia = createMatchMedia(400);
    });

    it('should render mobile', () => {
      useAdminSpy.mockImplementation(() => false);
      useSessionSpy.mockReturnValue({ status: 'unauthenticated', data: null });
      const { getByTestId, getByText } = render(<TestComponent />);
      expect(getByTestId('mobile-nav')).toBeTruthy();
      expect(getByText('Version: test1')).toBeTruthy();
    });

    it('should show/hide the Admin shortcut', () => {
      useAdminSpy.mockReturnValue(false);
      useSessionSpy.mockReturnValue({ status: 'unauthenticated', data: null });
      const { rerender, queryByTestId } = render(<TestComponent />);

      fireEvent.click(queryByTestId('mobile-drawer-button'));
      expect(queryByTestId('mobile-admin')).toBeNull();

      useAdminSpy.mockReturnValue(true);
      rerender(<TestComponent />);

      fireEvent.click(queryByTestId('mobile-drawer-button'));
      expect(queryByTestId('mobile-admin')).toBeTruthy();
    });

    it('should show/hide the Sign out button', () => {
      useAdminSpy.mockReturnValue(false);
      useSessionSpy.mockReturnValue({ status: 'authenticated', data: null });
      const { rerender, queryByTestId } = render(<TestComponent />);

      fireEvent.click(queryByTestId('mobile-drawer-button'));
      expect(queryByTestId('mobile-signout')).toBeTruthy();
      useSessionSpy.mockReturnValue({ status: 'unauthenticated', data: null });
      rerender(<TestComponent />);

      fireEvent.click(queryByTestId('mobile-drawer-button'));
      expect(queryByTestId('mobile-signout')).toBeNull();
    });
    it('should call signOut', () => {
      useAdminSpy.mockReturnValue(false);
      useSessionSpy.mockReturnValue({ status: 'authenticated', data: null });
      const { queryByTestId } = render(<TestComponent />);

      fireEvent.click(queryByTestId('mobile-drawer-button'));
      fireEvent.click(queryByTestId('mobile-signout'));
      expect(signOutSpy).toHaveBeenCalled();
    });

    it('should keep the drawer open if Tab or Shift are pressed', () => {
      useAdminSpy.mockReturnValue(false);
      useSessionSpy.mockReturnValue({ status: 'authenticated', data: null });
      const { queryByTestId } = render(<TestComponent />);

      fireEvent.click(queryByTestId('mobile-drawer-button'));
      const drawerDiv = queryByTestId('drawer-list');

      fireEvent.keyDown(drawerDiv, { key: 'Tab', code: 'Tab' });
      expect(queryByTestId('mobile-signout')).toBeTruthy();

      fireEvent.keyDown(drawerDiv, { key: 'Shift' });
      expect(queryByTestId('mobile-signout')).toBeTruthy();

      fireEvent.keyDown(drawerDiv, { code: 'Space' });
      expect(queryByTestId('mobile-signout')).toBeTruthy();
    });
  });
});
