import JoinPage from '@/pages/join/index.page';
import { render } from '@testing-library/react';
describe('Join Page', () => {
  it('should render', () => {
    expect(render(<JoinPage />)).toBeTruthy();
  });
});
