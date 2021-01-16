import { cleanup, render } from '@testing-library/react';
import { MiningMap } from 'components/information';

describe('Mining Maps', () => {
  afterEach(cleanup);

  it('should render', () => {
    render(<MiningMap />);
  });
});
