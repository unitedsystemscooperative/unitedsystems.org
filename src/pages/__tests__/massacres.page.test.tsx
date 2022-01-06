import { render } from '@testing-library/react';
import MassacrePage from '../massacres.page';

describe('Massacre Mission Tracker Page', () => {
  it('should render', () => {
    const component = render(<MassacrePage />);
    expect(component).toBeTruthy();
  });
});
