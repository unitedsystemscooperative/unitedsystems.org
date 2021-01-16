import { cleanup, renderHook } from '@testing-library/react-hooks';
import { useLoginAnon } from 'hooks/useLoginAnon';
import * as hooks from 'hooks/useRealmApp';

describe('useLoginAnon', () => {
  afterEach(cleanup);

  it('should login anon if user is null', () => {
    const loginAnonMock = jest.fn();
    jest.spyOn(hooks, 'useRealmApp').mockReturnValue({
      currentUser: null,
      logInAnon: loginAnonMock,
      logOut: jest.fn(),
      app: undefined,
    });
    renderHook(() => useLoginAnon());

    expect(loginAnonMock).toHaveBeenCalled();
  });
});
