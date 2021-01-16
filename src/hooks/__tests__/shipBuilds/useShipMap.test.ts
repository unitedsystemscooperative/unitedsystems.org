import { cleanup, renderHook } from '@testing-library/react-hooks';
import { useShipIdfromMap } from 'hooks/shipBuilds/useShipMap';
import Ships from 'data/shipBuilds/shipMap.json';

describe('useShipMapbyID', () => {
  afterEach(cleanup);

  it('should return undefined when id is blank', () => {
    const { result } = renderHook(() => useShipIdfromMap());

    expect(result.current).toBe(undefined);
  });

  it('should return the Alliance Challenger', () => {
    const foundShip = Ships.find((x) => x.shipId === 'alliance_challenger');

    const { result } = renderHook(() =>
      useShipIdfromMap('alliance_challenger')
    );

    expect(result.current).toEqual(foundShip);
  });

  it('should return undefined when ship is not found', () => {
    const { result } = renderHook(() => useShipIdfromMap('panther_clipper'));

    expect(result.current).toBe(undefined);
  });
});
