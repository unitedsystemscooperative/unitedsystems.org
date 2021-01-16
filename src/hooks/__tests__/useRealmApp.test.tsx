import { cleanup, renderHook } from '@testing-library/react-hooks';
import { useRealmApp } from 'hooks/useRealmApp';
import { RealmAppContext } from 'providers';
import { ReactNode } from 'react';

describe('useRealmApp', () => {
  afterEach(cleanup);

  it('should throw an error when app is null', () => {
    const wrapper = (props: { children: ReactNode }) => (
      <RealmAppContext.Provider value={null}>
        {props.children}
      </RealmAppContext.Provider>
    );
    const { result } = renderHook(() => useRealmApp(), { wrapper });

    expect(result.error.message).toBe(
      'You must call useRealmApp() inside of a <RealmAppProvider />'
    );
  });
});
