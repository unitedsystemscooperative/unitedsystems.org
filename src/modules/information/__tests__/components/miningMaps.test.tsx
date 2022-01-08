import { render } from '@testing-library/react';
import { MiningMaps } from '../../components/miningMaps';

describe('Mining Maps', () => {
  it('should render', () => {
    const component = render(<MiningMaps />);
    expect(component).toBeTruthy();
  });
});
