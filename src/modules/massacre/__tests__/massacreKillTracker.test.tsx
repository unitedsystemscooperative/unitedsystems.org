import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/material';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { MassacreKillTracker } from '../components/massacreKillTracker';
import { MassacreTabs } from '../components/massacreTabs';

const bbtestId = 'massacretab-BIBARIDJI';

const TestComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <MassacreKillTracker />
    </ThemeProvider>
  );
};

describe('Massacre Mission Tracker', () => {
  describe('Massacre Tab System w/o Context', () => {
    it('should render message', () => {
      const { getByText } = render(<MassacreTabs />);
      expect(getByText('Unable to retrieve context')).toBeTruthy();
    });
  });

  describe('Massacre Tab System w/ Context', () => {
    let component: RenderResult;
    beforeEach(() => {
      component = render(<TestComponent />);
    });
    afterEach(() => {
      cleanup();
    });

    it('should render', () => {
      expect(component).toBeTruthy();
    });

    it('should have the default values', () => {
      const { getByText, queryByText, getByTestId } = component;

      // Tabs
      expect(getByTestId(bbtestId)).toBeTruthy();
      expect(getByText(/^HIP 4120$/i)).toBeTruthy();

      // Current tab check
      expect(getByTestId('massacretab-add')).toHaveClass('Mui-selected');
      expect(getByText('Enter the HazRez system for reference')).toBeTruthy();
      expect(queryByText('Stations')).toBeNull();
    });

    it('should change system tab', () => {
      const { getByTestId } = component;

      fireEvent.click(getByTestId(bbtestId));

      expect(getByTestId('massacretab-add')).not.toHaveClass('Mui-selected');
      expect(getByTestId(bbtestId)).toHaveClass('Mui-selected');
    });

    describe('within a system tab', () => {
      beforeEach(() => {
        const { getByTestId } = component;

        fireEvent.click(getByTestId(bbtestId));
      });
      afterEach(() => {
        cleanup();
        localStorage.clear();
      });

      it('should have 6 function buttons', () => {
        const { getByTestId } = component;

        const functionButtonBox = getByTestId('tracker-function-buttons');
        expect(functionButtonBox.children.length).toBe(6);

        expect(getByTestId('tracker-delete')).toBeTruthy();
        expect(getByTestId('tracker-add-column')).toBeTruthy();
        expect(getByTestId('tracker-delete-column')).toBeTruthy();
        expect(getByTestId('tracker-unhide-factions')).toBeTruthy();
        expect(getByTestId('tracker-reset-counts')).toBeTruthy();
        expect(getByTestId('tracker-reset-factions')).toBeTruthy();
      });

      it.todo('should update and calculate totals');

      it.todo('should add a column');

      it.todo('should delete the last column');

      it.todo('should hide and reshow factions');

      it.todo('should reset counts');

      it.todo('should reset and refresh factions');

      it('should delete the tracker if confirmed', async () => {
        const confirmSpy = jest.spyOn(window, 'confirm');
        confirmSpy.mockImplementation(jest.fn(() => true));

        const { getByText, getByTestId, queryByTestId } = component;
        fireEvent.click(getByText('Delete Tracker'));

        expect(queryByTestId(bbtestId)).toBeFalsy();
        expect(getByTestId('massacretab-add')).toBeTruthy();
        expect(getByTestId('massacretab-add')).toHaveClass('Mui-selected');
      });

      it('should not delete the tracker if not confirmed', () => {
        const confirmSpy = jest.spyOn(window, 'confirm');
        confirmSpy.mockImplementation(jest.fn(() => false));

        const { getByText, getByTestId } = component;
        fireEvent.click(getByText('Delete Tracker'));

        const bbButton = getByTestId(bbtestId);
        expect(bbButton).toBeTruthy();
        expect(bbButton).toHaveClass('Mui-selected');
      });
    });
  });
});
