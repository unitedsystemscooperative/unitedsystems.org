import NextSteps from '@/pages/join/nextSteps.page';
import { render } from '@testing-library/react';
describe('Join Page', () => {
  it('should render', () => {
    expect(render(<NextSteps />)).toBeTruthy();
  });
});
