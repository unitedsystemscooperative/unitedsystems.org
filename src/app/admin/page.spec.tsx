import { cleanup, render } from '@testing-library/react';
import AdminPage from './page';
import * as authCheck from '@/utils/auth-check';

jest.mock<Partial<typeof authCheck>>('@/utils/auth-check', () => ({
  runAdminAuthCheck: jest.fn(),
}));

describe('Admin Page', () => {
  afterEach(cleanup);

  test('should render', async () => {
    jest.spyOn(authCheck, 'runAdminAuthCheck').mockResolvedValue(undefined);
    const page = await AdminPage();
    const result = render(page);

    expect(result).toBeTruthy();
  });
});
