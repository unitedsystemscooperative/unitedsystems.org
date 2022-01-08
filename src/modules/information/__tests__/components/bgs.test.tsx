import { render } from '@testing-library/react';
import { BGSInfo } from '../../components/bgs';

describe('BGS Info', () => {
  it('should render', () => {
    const component = render(<BGSInfo />);
    expect(component).toBeTruthy();
  });
});
