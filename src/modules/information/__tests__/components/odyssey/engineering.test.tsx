import { OdysseyEngineering } from '@/modules/information/components/odyssey/engineering';
import { render } from '@testing-library/react';
describe('Odyssey Engineering', () => {
  it('should render', () => {
    expect(render(<OdysseyEngineering />)).toBeTruthy();
  });
});
