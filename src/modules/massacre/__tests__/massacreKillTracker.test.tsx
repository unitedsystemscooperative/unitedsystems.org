import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/material';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { MassacreKillTracker } from '../components/massacreKillTracker';
import { MassacreTabs } from '../components/massacreTabs';
import MASSACRE_DEFAULT from '../data/massacreDefaults.json';
import * as functions from '../processHazRezSystem';

const mockenqueueSnackbar = jest.fn();
jest.mock('notistack', () => ({
  useSnackbar() {
    return {
      enqueueSnackbar: mockenqueueSnackbar ?? jest.fn(),
    };
  },
}));

const processHazRezSystemSpy = jest.spyOn(functions, 'processHazRezSystem');

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

  describe('within a system tab', () => {
    let component: RenderResult;
    beforeEach(() => {
      component = null;
      localStorage.setItem('massacreTrackerStore', JSON.stringify(MASSACRE_DEFAULT));
      component = render(<TestComponent />);
      const { getByTestId } = component;

      fireEvent.click(getByTestId(bbtestId));
    });
    afterEach(() => {
      cleanup();
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

    it('should update and calculate totals assuming rep=Allied', () => {
      const { getByTestId, getAllByTestId } = component;
      // rep multiplier is determined from ../data/massacreKillValues.json
      const repMultiplier = 0.48;

      const totalMissions = getAllByTestId('total-missions')[0];
      const totalKills = getAllByTestId('total-kills')[0];
      const totalPayout = getAllByTestId('total-payout')[0];
      const atafactionSummary = getByTestId('faction-totalKills-atahingar co-op');
      const atafactionmission0 = getByTestId('faction-mission-0-atahingar co-op').querySelector(
        'input'
      );
      const atafactionmission1 = getByTestId('faction-mission-1-atahingar co-op').querySelector(
        'input'
      );

      // default values for the summaries
      expect(totalMissions.textContent).toContain(': 0');
      expect(totalKills.textContent).toContain(': 0');
      expect(totalPayout.textContent).toContain(': 0 million');
      expect(atafactionSummary.textContent).toBe('0');
      expect(atafactionmission0.value).toBe('0');

      // change one faction, one mission
      fireEvent.input(atafactionmission0, { target: { value: '5' } });

      expect(totalMissions.textContent).toContain(': 1');
      expect(totalKills.textContent).toContain(': 5');
      expect(totalPayout.textContent).toContain(`: ${5 * repMultiplier} million`);
      expect(atafactionSummary.textContent).toBe('5');

      // change one faction, two missions
      fireEvent.input(atafactionmission1, { target: { value: '10' } });

      expect(totalMissions.textContent).toContain(': 2');
      expect(totalKills.textContent).toContain(': 15');
      expect(totalPayout.textContent).toContain(`: ${+(15 * repMultiplier).toFixed(2)} million`);
      expect(atafactionSummary.textContent).toBe('15');

      // change two faction, two missions each
      fireEvent.input(
        getByTestId('faction-mission-2-bibaridji organisation').querySelector('input'),
        { target: { value: '3' } }
      );
      fireEvent.input(
        getByTestId('faction-mission-3-bibaridji organisation').querySelector('input'),
        { target: { value: '2' } }
      );

      expect(totalMissions.textContent).toContain(': 4');
      // stays at 15 as the stacking means the bb org kills will tick along with atahingar co-op kills.
      expect(totalKills.textContent).toContain(': 15');
      expect(totalPayout.textContent).toContain(`: ${+(20 * repMultiplier).toFixed(2)} million`);
      expect(atafactionSummary.textContent).toBe('15');
      expect(getByTestId('faction-totalKills-bibaridji organisation').textContent).toBe('5');
    });

    it('should add a column', () => {
      const { getByText, getAllByText, getByTestId } = component;

      fireEvent.click(getByTestId('tracker-add-column'));

      expect(getByText('Mission 6')).toBeTruthy();
      expect(getAllByText(/^Mission \d{1,2}$/).length).toBe(6);
    });

    it('should not add a column past 20 missions', () => {
      const { getAllByText, getByTestId } = component;

      for (let i = 0; i < 15; i++) {
        fireEvent.click(getByTestId('tracker-add-column'));
      }
      expect(mockenqueueSnackbar).not.toHaveBeenCalled();
      expect(getAllByText(/^Mission \d{1,2}$/).length).toBe(20);

      fireEvent.click(getByTestId('tracker-add-column'));
      expect(mockenqueueSnackbar).toHaveBeenCalled();
      expect(getAllByText(/^Mission \d{1,2}$/).length).toBe(20);
    });

    it('should delete the last column', () => {
      const { queryByText, getByTestId } = component;

      fireEvent.click(getByTestId('tracker-delete-column'));

      expect(queryByText('Mission 5')).toBeFalsy();
    });

    it('should not delete Mission 1 column', () => {
      const { queryByText, getByTestId } = component;

      fireEvent.click(getByTestId('tracker-delete-column'));
      fireEvent.click(getByTestId('tracker-delete-column'));
      fireEvent.click(getByTestId('tracker-delete-column'));
      fireEvent.click(getByTestId('tracker-delete-column'));
      expect(mockenqueueSnackbar).not.toHaveBeenCalled();

      fireEvent.click(getByTestId('tracker-delete-column'));
      expect(mockenqueueSnackbar).toHaveBeenCalled();
      expect(queryByText('Mission 1')).toBeTruthy();
      expect(queryByText('Mission 2')).toBeFalsy();
    });

    it('should hide and reshow factions', () => {
      const { getByTestId, getAllByTestId, queryAllByTestId } = component;
      // rep multiplier is determined from ../data/massacreKillValues.json
      const repMultiplier = 0.48;

      const totalMissions = getAllByTestId('total-missions')[0];
      const totalKills = getAllByTestId('total-kills')[0];
      const totalPayout = getAllByTestId('total-payout')[0];
      const atafactionSummary = getByTestId('faction-totalKills-atahingar co-op');

      fireEvent.input(getByTestId('faction-mission-0-atahingar co-op').querySelector('input'), {
        target: { value: '1' },
      });
      fireEvent.input(getByTestId('faction-mission-1-atahingar co-op').querySelector('input'), {
        target: { value: '2' },
      });
      fireEvent.input(getByTestId('faction-mission-2-atahingar co-op').querySelector('input'), {
        target: { value: '3' },
      });
      fireEvent.input(getByTestId('faction-mission-3-atahingar co-op').querySelector('input'), {
        target: { value: '4' },
      });
      fireEvent.input(getByTestId('faction-mission-4-atahingar co-op').querySelector('input'), {
        target: { value: '5' },
      });
      expect(totalMissions.textContent).toContain(': 5');
      expect(totalKills.textContent).toContain(': 15');
      expect(totalPayout.textContent).toContain(`: ${+(15 * repMultiplier).toFixed(2)} million`);
      expect(atafactionSummary.textContent).toBe('15');

      fireEvent.click(getByTestId('faction-delete-atahingar co-op'));

      expect(totalMissions.textContent).toContain(': 0');
      expect(totalKills.textContent).toContain(': 0');
      expect(totalPayout.textContent).toContain(`: ${+(0 * repMultiplier).toFixed(2)} million`);
      expect(queryAllByTestId(/atahingar co-op$/).length).toBe(0);

      fireEvent.click(getByTestId('tracker-unhide-factions'));
      expect(queryAllByTestId(/atahingar co-op$/).length).toBeGreaterThan(0);
    });

    it('should reset counts', () => {
      const { getByTestId, getAllByTestId, queryAllByTestId } = component;
      // rep multiplier is determined from ../data/massacreKillValues.json
      const repMultiplier = 0.48;

      const totalMissions = getAllByTestId('total-missions')[0];
      const totalKills = getAllByTestId('total-kills')[0];
      const totalPayout = getAllByTestId('total-payout')[0];
      const atafactionSummary = getByTestId('faction-totalKills-atahingar co-op');
      const cidfactionSummary = getByTestId('faction-totalKills-criminals in disguise');

      fireEvent.input(getByTestId('faction-mission-0-atahingar co-op').querySelector('input'), {
        target: { value: '1' },
      });
      fireEvent.input(getByTestId('faction-mission-1-atahingar co-op').querySelector('input'), {
        target: { value: '2' },
      });
      fireEvent.input(getByTestId('faction-mission-2-atahingar co-op').querySelector('input'), {
        target: { value: '3' },
      });
      fireEvent.input(getByTestId('faction-mission-3-atahingar co-op').querySelector('input'), {
        target: { value: '4' },
      });
      fireEvent.input(getByTestId('faction-mission-4-atahingar co-op').querySelector('input'), {
        target: { value: '5' },
      });
      fireEvent.input(
        getByTestId('faction-mission-0-criminals in disguise').querySelector('input'),
        {
          target: { value: '1' },
        }
      );
      fireEvent.input(
        getByTestId('faction-mission-1-criminals in disguise').querySelector('input'),
        {
          target: { value: '2' },
        }
      );
      fireEvent.input(
        getByTestId('faction-mission-2-criminals in disguise').querySelector('input'),
        {
          target: { value: '3' },
        }
      );
      fireEvent.input(
        getByTestId('faction-mission-3-criminals in disguise').querySelector('input'),
        {
          target: { value: '4' },
        }
      );
      fireEvent.input(
        getByTestId('faction-mission-4-criminals in disguise').querySelector('input'),
        {
          target: { value: '5' },
        }
      );
      expect(totalMissions.textContent).toContain(': 10');
      expect(totalKills.textContent).toContain(': 15');
      expect(totalPayout.textContent).toContain(`: ${+(30 * repMultiplier).toFixed(2)} million`);
      expect(atafactionSummary.textContent).toBe('15');
      expect(cidfactionSummary.textContent).toBe('15');

      fireEvent.click(getByTestId('tracker-reset-counts'));
      expect(totalMissions.textContent).toContain(': 0');
      expect(totalKills.textContent).toContain(': 0');
      expect(totalPayout.textContent).toContain(`: ${+(0 * repMultiplier).toFixed(2)} million`);
      expect(atafactionSummary.textContent).toBe('0');
      expect(cidfactionSummary.textContent).toBe('0');
      queryAllByTestId(/^faction-mission-/).forEach((element) =>
        expect(element.querySelector('input').value).toBe('0')
      );
    });

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
