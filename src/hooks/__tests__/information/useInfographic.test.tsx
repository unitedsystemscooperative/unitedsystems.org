import { cleanup, renderHook } from '@testing-library/react-hooks';
import { useInfographic } from 'hooks/information/useInfographic';

describe('useInfographic', () => {
  afterEach(cleanup);

  it('should return undefined', () => {
    const { result } = renderHook(() => useInfographic('noobhammer'));

    expect(result.current).toBe(undefined);
  });

  it('should return a value', () => {
    const { result } = renderHook(() => useInfographic('cave-johnson'));

    expect(result.current).toBeDefined();
  });
});
