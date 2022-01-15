import OdyCombatPage from '@/pages/information/odyssey/s2gcombat.page';
import { render } from '@testing-library/react';

describe('Odyssey Combat Page', () => {
  it('should render', () => {
    const component = render(<OdyCombatPage />);
    expect(component).toBeTruthy();
  });
});
