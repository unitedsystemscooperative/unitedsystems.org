import { OdysseyS2GCombat } from '@/modules/information/components/odyssey/s2gcombat';
import { render } from '@testing-library/react';
describe('Odyssey S2G Combat', () => {
  it('should render', () => {
    expect(render(<OdysseyS2GCombat />)).toBeTruthy();
  });
});
