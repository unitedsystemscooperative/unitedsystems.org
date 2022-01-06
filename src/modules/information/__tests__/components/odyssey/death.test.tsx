import { OdysseyDeath } from '@/modules/information/components/odyssey/death';
import { render } from '@testing-library/react';
describe('Odyssey Death', () => {
  it('should render', () => {
    expect(render(<OdysseyDeath />)).toBeTruthy();
  });
});
