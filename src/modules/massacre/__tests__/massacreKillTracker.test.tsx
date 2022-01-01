import { ThemeProvider } from '@mui/material';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { MassacreKillTracker } from '../components/massacreKillTracker';
import { MassacreTabSystem } from '../components/massacreTabSystem';
import { theme } from '@/styles/theme';

describe('Massacre Mission Tracker', () => {
  describe('Massacre Tab System w/o Context', () => {
    it('should render message', () => {
      const { getByText } = render(<MassacreTabSystem />);
      expect(getByText('Unable to retrieve context')).toBeTruthy();
    });
  });

  describe('Massacre Tab System w/ Context', () => {
    let component: RenderResult;
    beforeEach(() => {
      component = render(
        <ThemeProvider theme={theme}>
          <MassacreKillTracker />
        </ThemeProvider>
      );
    });

    it('should render', () => {
      expect(component).toBeTruthy();
    });

    it('should have the default values', () => {
      const { getByText, queryByText } = component;

      // Tabs
      expect(getByText(/^Bibaridji$/i)).toBeTruthy();
      expect(getByText(/^HIP 4120$/i)).toBeTruthy();

      // Current tab check
      expect(getByText(/^\+$/)).toHaveClass('Mui-selected');
      expect(getByText('Enter the HazRez system for reference')).toBeTruthy();
      expect(queryByText('Stations')).toBeNull();
    });

    it('should change system tab', () => {
      const { getByText } = component;

      fireEvent.click(getByText(/^Bibaridji$/i));

      expect(getByText(/^\+$/)).not.toHaveClass('Mui-selected');
      expect(getByText(/^Bibaridji$/i)).toHaveClass('Mui-selected');
    });

    describe('within a system tab', () => {
      beforeEach(() => {
        const { getByText } = component;

        fireEvent.click(getByText(/^Bibaridji$/i));
      });

      it.todo('should have 6 function buttons');

      it.todo('should update and calculate totals');

      it.todo('should add a column');

      it.todo('should delete the last column');

      it.todo('should hide and reshow factions');

      it.todo('should reset counts');

      it.todo('should reset and refresh factions');

      it.todo('should delete the tracker');
    });
  });
});
