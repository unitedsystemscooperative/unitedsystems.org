import { Ranks } from '@/modules/information/components/ranks/ranks';
import { render } from '@testing-library/react';
describe('Ranks', () => {
  it('should render', () => {
    expect(render(<Ranks />)).toBeTruthy();
  });
});
