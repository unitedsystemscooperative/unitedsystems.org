import { ThemeProvider } from '@mui/material';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MassacreKillTracker } from '../components/massacreKillTracker';
import { MassacreTabs } from '../components/massacreTabs';
import { theme } from '@/styles/theme';

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
      expect(getByText(/^\+$/)).toHaveClass('Mui-selected');
      expect(getByText('Enter the HazRez system for reference')).toBeTruthy();
      expect(queryByText('Stations')).toBeNull();
    });

    it('should change system tab', () => {
      const { getByText, getByTestId } = component;

      fireEvent.click(getByTestId(bbtestId));

      expect(getByText(/^\+$/)).not.toHaveClass('Mui-selected');
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

      it.todo('should have 6 function buttons');

      it.todo('should update and calculate totals');

      it.todo('should add a column');

      it.todo('should delete the last column');

      it.todo('should hide and reshow factions');

      it.todo('should reset counts');

      it.todo('should reset and refresh factions');

      it('should delete the tracker if confirmed', async () => {
        const confirmSpy = jest.spyOn(window, 'confirm');
        confirmSpy.mockImplementation(jest.fn(() => true));

        const { getByText, queryByTestId } = component;
        fireEvent.click(getByText('Delete Tracker'));

        expect(queryByTestId(bbtestId)).toBeFalsy();
        expect(getByText(/^\+$/)).toBeTruthy();
        expect(getByText(/^\+$/)).toHaveClass('Mui-selected');
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
