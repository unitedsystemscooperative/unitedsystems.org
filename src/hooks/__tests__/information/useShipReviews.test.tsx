import { cleanup, renderHook } from '@testing-library/react-hooks';
import { useShipReviews } from 'hooks/information/useShipReviews';

describe('useShipReviews', () => {
  afterEach(cleanup);

  it('should return a value', () => {
    const { result } = renderHook(() => useShipReviews());

    expect(result.current).toBeDefined();
    expect(result.current.length).toBeGreaterThan(1);
  });
});
