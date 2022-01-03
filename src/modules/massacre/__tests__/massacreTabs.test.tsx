import { ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme';
import { MassacreKillTracker } from '../components/massacreKillTracker';
import { MassacreTabs } from '../components/massacreTabs';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';

const bbtestId = 'massacretab-BIBARIDJI';

const TestComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <MassacreKillTracker />
    </ThemeProvider>
  );
};

describe('Massacre Tab System', () => {
  describe('w/o Context', () => {
    it('should render message', () => {
      const { getByText } = render(<MassacreTabs />);
      expect(getByText('Unable to retrieve context')).toBeTruthy();
    });
  });

  describe('w/ Context', () => {
    let component: RenderResult;
    beforeEach(() => {
      component = render(<TestComponent />);
    });
    afterEach(() => {
      cleanup();
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
  });
});
