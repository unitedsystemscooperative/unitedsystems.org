import { theme } from '@/styles/theme';
import { mockenqueueSnackbar } from '@/__mocks__/notistack';
import { server } from '@/__mocks__/server/server';
import { ThemeProvider } from '@mui/material';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { RequestHandler, rest } from 'msw';
import { ISystemFactionInfo } from '~/edsmQueries/models/faction.model';
import { ISphereSystem } from '~/edsmQueries/models/sphereSystems.model';
import { ISystemStations } from '~/edsmQueries/models/stationsInSystem';
import { MassacreKillTracker } from '../components/massacreKillTracker';
import MASSACRE_DEFAULT from '../data/massacreDefaults.json';

const bbtestId = 'massacretab-BIBARIDJI';
const hip4120testId = 'massacretab-HIP 4120';

const TestComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <MassacreKillTracker />
    </ThemeProvider>
  );
};

describe('Massacre Mission Tracker Tab', () => {
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

  it('should reject NaN values in missions', () => {
    const { getByTestId } = component;

    fireEvent.input(
      getByTestId('faction-mission-0-bibaridji organisation').querySelector('input'),
      { target: { value: 'w' } }
    );

    expect(mockenqueueSnackbar).toHaveBeenCalled();
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
    fireEvent.input(getByTestId('faction-mission-0-criminals in disguise').querySelector('input'), {
      target: { value: '1' },
    });
    fireEvent.input(getByTestId('faction-mission-1-criminals in disguise').querySelector('input'), {
      target: { value: '2' },
    });
    fireEvent.input(getByTestId('faction-mission-2-criminals in disguise').querySelector('input'), {
      target: { value: '3' },
    });
    fireEvent.input(getByTestId('faction-mission-3-criminals in disguise').querySelector('input'), {
      target: { value: '4' },
    });
    fireEvent.input(getByTestId('faction-mission-4-criminals in disguise').querySelector('input'), {
      target: { value: '5' },
    });
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

  it('should reset and refresh factions', async () => {
    const testSphereSystems: ISphereSystem[] = [
      {
        distance: 0,
        bodyCount: 3,
        name: 'Bibaridji',
        coords: { x: 1, y: 2, z: 3 },
        coordsLocked: false,
        information: { population: 200 },
        primaryStar: { type: 'o', name: 'Bibaridji A', isScoopable: true },
      },
      {
        distance: 2,
        bodyCount: 3,
        name: 'HIP 3551',
        coords: { x: 1, y: 2, z: 3 },
        coordsLocked: false,
        information: { population: 200 },
        primaryStar: { type: 'o', name: 'HIP 3551 A', isScoopable: true },
      },
      {
        distance: 300,
        bodyCount: 3,
        name: 'Arugbal',
        coords: { x: 1, y: 2, z: 3 },
        coordsLocked: false,
        information: { population: 200 },
        primaryStar: { type: 'o', name: 'Arugbal A', isScoopable: true },
      },
    ];
    const hip3551FactionInfo: ISystemFactionInfo = {
      id: 14304,
      id64: 1458107749066,
      name: 'HIP 3551',
      url: 'https://www.edsm.net/en/system/id/14304/name/HIP+3551',
      controllingFaction: {
        id: 82211,
        name: 'United Systems Cooperative',
        allegiance: 'Independent',
        government: 'Cooperative',
      },
      factions: [
        {
          id: 79611,
          name: 'HIP 3551 as one',
          allegiance: 'Independent',
          government: 'Cooperative',
          influence: 0.232767,
          state: 'Election',
          activeStates: [
            { state: 'Civil unrest' },
            { state: 'Natural Disaster' },
            { state: 'Election' },
          ],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
        {
          id: 82211,
          name: 'United Systems Cooperative',
          allegiance: 'Independent',
          government: 'Cooperative',
          influence: 0.232767,
          state: 'Election',
          activeStates: [{ state: 'Outbreak' }, { state: 'Election' }],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
        {
          id: 22024,
          name: 'HIP 2327 Prison Colony',
          allegiance: 'Independent',
          government: 'Prison colony',
          influence: 0.188811,
          state: 'Civil unrest',
          activeStates: [{ state: 'Civil unrest' }],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
        {
          id: 23679,
          name: 'HIP 3551 Nobles',
          allegiance: 'Independent',
          government: 'Feudal',
          influence: 0.096903,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [{ state: 'War', trend: 0 }],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
        {
          id: 9729,
          name: 'New Bibaridji Green Party',
          allegiance: 'Federation',
          government: 'Democracy',
          influence: 0.096903,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [{ state: 'War', trend: 0 }],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
        {
          id: 20087,
          name: "Workers of Neris Worker's Party",
          allegiance: 'Independent',
          government: 'Communism',
          influence: 0.075924,
          state: 'Blight',
          activeStates: [{ state: 'Blight' }],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Discontented',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
        {
          id: 12522,
          name: 'Atahingar Co-op',
          allegiance: 'Independent',
          government: 'Cooperative',
          influence: 0.075924,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
        {
          id: 19239,
          name: 'Arugbal Revolutionary Party',
          allegiance: 'Independent',
          government: 'Communism',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
        {
          id: 23630,
          name: 'Democrats of Evnici',
          allegiance: 'Independent',
          government: 'Democracy',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'None',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
        {
          id: 81923,
          name: "Pilots' Federation Local Branch",
          allegiance: 'Pilots Federation',
          government: 'Democracy',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'None',
          isPlayer: false,
          lastUpdate: 1641169581,
        },
      ],
    };
    const arugbalFactionInfo: ISystemFactionInfo = {
      id: 9708,
      id64: 669611926921,
      name: 'Arugbal',
      url: 'https://www.edsm.net/en/system/id/9708/name/Arugbal',
      controllingFaction: {
        id: 82211,
        name: 'United Systems Cooperative',
        allegiance: 'Independent',
        government: 'Cooperative',
      },
      factions: [
        {
          id: 82211,
          name: 'United Systems Cooperative',
          allegiance: 'Independent',
          government: 'Cooperative',
          influence: 0.688,
          state: 'Civil liberty',
          activeStates: [{ state: 'Civil liberty' }, { state: 'Pirate attack' }],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 82123,
          name: 'Alba Rotam Private Military Contractor',
          allegiance: 'Independent',
          government: 'Dictatorship',
          influence: 0.088,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 76811,
          name: 'Bureau of Arugbal',
          allegiance: 'Independent',
          government: 'Dictatorship',
          influence: 0.069,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 76810,
          name: 'Arugbal Blue State Limited',
          allegiance: 'Federation',
          government: 'Corporate',
          influence: 0.06,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 19239,
          name: 'Arugbal Revolutionary Party',
          allegiance: 'Independent',
          government: 'Communism',
          influence: 0.059,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 76809,
          name: 'Arugbal Pirates',
          allegiance: 'Independent',
          government: 'Anarchy',
          influence: 0.036,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 24263,
          name: 'HIP 4120 Republic Party',
          allegiance: 'Independent',
          government: 'Democracy',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 9729,
          name: 'New Bibaridji Green Party',
          allegiance: 'Federation',
          government: 'Democracy',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 22075,
          name: 'HIP 5527 Coordinated',
          allegiance: 'Independent',
          government: 'Cooperative',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 81140,
          name: 'criminals in disguise',
          allegiance: 'Independent',
          government: 'Patronage',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: true,
          lastUpdate: 1641176671,
        },
        {
          id: 81923,
          name: "Pilots' Federation Local Branch",
          allegiance: 'Pilots Federation',
          government: 'Democracy',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'None',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 17012,
          name: 'Uniting Nasoda',
          allegiance: 'Independent',
          government: 'Cooperative',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 24083,
          name: 'Union of Matsya Independents',
          allegiance: 'Federation',
          government: 'Democracy',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 81155,
          name: 'Royal Phoenix Corporation',
          allegiance: 'Independent',
          government: 'Corporate',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: true,
          lastUpdate: 1641176671,
        },
        {
          id: 18416,
          name: 'HIP 6439 Focus',
          allegiance: 'Independent',
          government: 'Dictatorship',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
        {
          id: 21441,
          name: 'Liberals of Sigur',
          allegiance: 'Federation',
          government: 'Democracy',
          influence: 0,
          state: 'None',
          activeStates: [],
          recoveringStates: [],
          pendingStates: [],
          happiness: 'Happy',
          isPlayer: false,
          lastUpdate: 1641176671,
        },
      ],
    };
    const hip3551StationInfo: ISystemStations = {
      id: 14304,
      id64: 1458107749066,
      name: 'HIP 3551',
      url: 'https://www.edsm.net/en/system/stations/id/14304/name/HIP+3551',
      stations: [
        {
          id: 126536,
          marketId: 3803866368,
          type: 'Odyssey Settlement',
          name: 'Murdoch Excavation Facility',
          distanceToArrival: 1162.562047,
          allegiance: 'Independent',
          government: 'Communism',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 19239, name: 'Arugbal Revolutionary Party' },
          updateTime: {
            information: '2021-09-19 14:35:49',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 98087,
          marketId: 3803865088,
          type: 'Odyssey Settlement',
          name: 'Baldock Horticultural Exchange',
          distanceToArrival: 1164.352099,
          allegiance: 'Independent',
          government: 'Prison colony',
          economy: 'Agriculture',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 22024, name: 'HIP 2327 Prison Colony' },
          updateTime: {
            information: '2021-12-31 17:20:21',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 87511,
          marketId: 3803865344,
          type: 'Odyssey Settlement',
          name: "Mohanty's Minerals",
          distanceToArrival: 1165.413359,
          allegiance: 'Federation',
          government: 'Democracy',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 9729, name: 'New Bibaridji Green Party' },
          updateTime: {
            information: '2022-01-02 05:31:00',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 57579,
          marketId: 3500475392,
          type: 'Planetary Outpost',
          name: 'Simmons Landing',
          body: { id: 17806459, name: 'HIP 3551 1 a', latitude: -5.40482, longitude: 131.36 },
          distanceToArrival: 1181,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Colony',
          secondEconomy: null,
          haveMarket: true,
          haveShipyard: true,
          haveOutfitting: true,
          otherServices: [
            'Black Market',
            'Restock',
            'Refuel',
            'Repair',
            'Contacts',
            'Universal Cartographics',
            'Missions',
            'Crew Lounge',
            'Tuning',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 79611, name: 'HIP 3551 as one' },
          updateTime: {
            information: '2022-01-02 10:52:25',
            market: '2021-12-31 22:22:24',
            shipyard: '2021-12-31 22:22:24',
            outfitting: '2021-12-31 22:22:24',
          },
        },
        {
          id: 89798,
          marketId: 3803867648,
          type: 'Odyssey Settlement',
          name: 'Daisley Mineralogic Enterprise',
          body: { id: 17806463, name: 'HIP 3551 1 b' },
          distanceToArrival: 1180,
          allegiance: 'Independent',
          government: 'Communism',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 20087, name: "Workers of Neris Worker's Party" },
          updateTime: {
            information: '2022-01-01 21:56:02',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 86677,
          marketId: 3803867136,
          type: 'Odyssey Settlement',
          name: 'Yokoyama Botanical Enterprise',
          distanceToArrival: 1173.62227,
          allegiance: 'Federation',
          government: 'Democracy',
          economy: 'Agriculture',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 9729, name: 'New Bibaridji Green Party' },
          updateTime: {
            information: '2022-01-02 05:31:00',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 98687,
          marketId: 3803867392,
          type: 'Odyssey Settlement',
          name: 'Iwasaki Drilling Territory',
          distanceToArrival: 1174.95025,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 79611, name: 'HIP 3551 as one' },
          updateTime: {
            information: '2022-01-02 10:52:25',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 108457,
          marketId: 3803866112,
          type: 'Odyssey Settlement',
          name: 'Munn Mining Installation',
          distanceToArrival: 1185.172367,
          allegiance: 'Independent',
          government: 'Feudal',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: true,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 23679, name: 'HIP 3551 Nobles' },
          updateTime: {
            information: '2021-12-29 14:54:19',
            market: '2021-06-01 03:28:25',
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 101363,
          marketId: 3803866880,
          type: 'Odyssey Settlement',
          name: 'Desmond Agricultural Collection',
          distanceToArrival: 1188.283191,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Agriculture',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 79611, name: 'HIP 3551 as one' },
          updateTime: {
            information: '2022-01-02 10:52:25',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 103665,
          marketId: 3803865600,
          type: 'Odyssey Settlement',
          name: 'Krause Hydroponics Garden',
          distanceToArrival: 1189.016137,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Agriculture',
          secondEconomy: null,
          haveMarket: true,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 79611, name: 'HIP 3551 as one' },
          updateTime: {
            information: '2022-01-02 10:52:25',
            market: '2021-05-29 02:43:01',
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 164340,
          marketId: 3908633856,
          type: 'Odyssey Settlement',
          name: 'Van Muiswinkel Dredging Complex',
          distanceToArrival: 1712.049011,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 82211, name: 'United Systems Cooperative' },
          updateTime: {
            information: '2022-01-02 10:52:25',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 161497,
          marketId: 3908633344,
          type: 'Odyssey Settlement',
          name: "Bortnik's Claim",
          distanceToArrival: 1717.330181,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 82211, name: 'United Systems Cooperative' },
          updateTime: {
            information: '2022-01-02 10:52:25',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 51155,
          marketId: 3221356032,
          type: 'Outpost',
          name: 'Sawyer Stop',
          distanceToArrival: 1717.642062,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: true,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Universal Cartographics',
            'Missions',
            'Tuning',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 82211, name: 'United Systems Cooperative' },
          updateTime: {
            information: '2022-01-02 23:14:28',
            market: '2022-01-02 23:14:34',
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 95721,
          marketId: 3908632832,
          type: 'Odyssey Settlement',
          name: 'Achike Mining Exploration',
          distanceToArrival: 1720.984854,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: true,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 79611, name: 'HIP 3551 as one' },
          updateTime: {
            information: '2022-01-02 10:52:25',
            market: '2021-05-29 14:09:44',
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 104994,
          marketId: 3908633088,
          type: 'Odyssey Settlement',
          name: 'Ivanychuk Mining Hub',
          distanceToArrival: 1727.522165,
          allegiance: 'Independent',
          government: 'Communism',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Black Market',
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 20087, name: "Workers of Neris Worker's Party" },
          updateTime: {
            information: '2022-01-01 21:56:02',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 126568,
          marketId: 3908633600,
          type: 'Odyssey Settlement',
          name: 'Sommer Extraction Platform',
          distanceToArrival: 2908.344822,
          allegiance: 'Independent',
          government: 'Feudal',
          economy: 'Extraction',
          secondEconomy: null,
          haveMarket: false,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: [
            'Refuel',
            'Repair',
            'Contacts',
            'Missions',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 23679, name: 'HIP 3551 Nobles' },
          updateTime: {
            information: '2021-12-29 14:54:19',
            market: null,
            shipyard: null,
            outfitting: null,
          },
        },
      ],
    };
    const arugbalStationInfo: ISystemStations = {
      id: 9708,
      id64: 669611926921,
      name: 'Arugbal',
      url: 'https://www.edsm.net/en/system/stations/id/9708/name/Arugbal',
      stations: [
        {
          id: 69868,
          marketId: 3702469376,
          type: 'Fleet Carrier',
          name: 'KFV-G9K',
          distanceToArrival: 0,
          allegiance: 'Independent',
          government: 'Fleet Carrier',
          economy: 'Fleet Carrier',
          secondEconomy: null,
          haveMarket: true,
          haveShipyard: false,
          haveOutfitting: false,
          otherServices: ['Restock', 'Refuel', 'Repair', 'Contacts', 'Crew Lounge'],
          updateTime: {
            information: '2021-12-11 07:25:05',
            market: '2021-12-11 07:25:12',
            shipyard: null,
            outfitting: null,
          },
        },
        {
          id: 77653,
          marketId: 3704548096,
          type: 'Fleet Carrier',
          name: 'KHM-BQN',
          distanceToArrival: 0,
          allegiance: 'Independent',
          government: 'Fleet Carrier',
          economy: 'Fleet Carrier',
          secondEconomy: null,
          haveMarket: true,
          haveShipyard: false,
          haveOutfitting: true,
          otherServices: [
            'Restock',
            'Refuel',
            'Repair',
            'Contacts',
            'Universal Cartographics',
            'Crew Lounge',
          ],
          updateTime: {
            information: '2021-06-30 01:53:34',
            market: '2021-06-29 16:04:39',
            shipyard: null,
            outfitting: '2021-07-01 02:40:28',
          },
        },
        {
          id: 45646,
          marketId: 3221275392,
          type: 'Orbis Starport',
          name: 'Meaney Dock',
          distanceToArrival: 802.167683,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Industrial',
          secondEconomy: 'Extraction',
          haveMarket: true,
          haveShipyard: true,
          haveOutfitting: true,
          otherServices: [
            'Black Market',
            'Restock',
            'Refuel',
            'Repair',
            'Contacts',
            'Universal Cartographics',
            'Missions',
            'Crew Lounge',
            'Tuning',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 82211, name: 'United Systems Cooperative' },
          updateTime: {
            information: '2022-01-02 20:04:16',
            market: '2022-01-02 20:04:22',
            shipyard: '2022-01-02 20:04:22',
            outfitting: '2022-01-02 20:04:56',
          },
        },
        {
          id: 53613,
          marketId: 3221275648,
          type: 'Outpost',
          name: 'Haarsma Colony',
          distanceToArrival: 805.483354,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Industrial',
          secondEconomy: 'Extraction',
          haveMarket: true,
          haveShipyard: false,
          haveOutfitting: true,
          otherServices: [
            'Black Market',
            'Restock',
            'Refuel',
            'Contacts',
            'Universal Cartographics',
            'Missions',
            'Crew Lounge',
            'Interstellar Factors Contact',
            'Search and Rescue',
          ],
          controllingFaction: { id: 82211, name: 'United Systems Cooperative' },
          updateTime: {
            information: '2022-01-02 20:13:37',
            market: '2022-01-02 20:13:44',
            shipyard: null,
            outfitting: '2022-01-03 02:24:43',
          },
        },
        {
          id: 38034,
          marketId: 3221275904,
          type: 'Outpost',
          name: 'Bryant Platform',
          distanceToArrival: 1938.980389,
          allegiance: 'Independent',
          government: 'Cooperative',
          economy: 'Extraction',
          secondEconomy: 'Industrial',
          haveMarket: true,
          haveShipyard: false,
          haveOutfitting: true,
          otherServices: [
            'Black Market',
            'Restock',
            'Refuel',
            'Repair',
            'Contacts',
            'Universal Cartographics',
            'Missions',
            'Crew Lounge',
            'Search and Rescue',
          ],
          controllingFaction: { id: 82211, name: 'United Systems Cooperative' },
          updateTime: {
            information: '2022-01-02 10:51:31',
            market: '2021-12-02 18:04:53',
            shipyard: null,
            outfitting: '2021-12-02 18:04:53',
          },
        },
      ],
    };
    const requestHandlers: RequestHandler[] = [
      rest.get('https://www.edsm.net/api-v1/sphere-systems', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(testSphereSystems));
      }),
      rest.get('https://www.edsm.net/api-system-v1/factions', (req, res, ctx) => {
        const systemName = req.url.searchParams.get('systemName').toLowerCase();
        switch (systemName) {
          case 'arugbal':
            return res(ctx.status(200), ctx.json(arugbalFactionInfo));
          case 'hip 3551':
            return res(ctx.status(200), ctx.json(hip3551FactionInfo));
          default:
            return res(ctx.status(500), ctx.json({ errorMessage: 'system not found' }));
        }
      }),
      rest.get('https://www.edsm.net/api-system-v1/stations', (req, res, ctx) => {
        const systemName = req.url.searchParams.get('systemName').toLowerCase();
        switch (systemName) {
          case 'arugbal':
            return res(ctx.status(200), ctx.json(arugbalStationInfo));
          case 'hip 3551':
            return res(ctx.status(200), ctx.json(hip3551StationInfo));
          default:
            return res(ctx.status(500), ctx.json({ errorMessage: 'system not found' }));
        }
      }),
    ];

    server.use(...requestHandlers);

    const { getByText, getByTestId, queryByText } = component;

    fireEvent.click(getByTestId('tracker-reset-factions'));

    await waitFor(() => {
      expect(getByText('Arugbal')).toBeTruthy();
      expect(queryByText(/^criminals in disguise/i)).toBeFalsy();
    });
  });

  it('should delete the tracker if confirmed', () => {
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

  it('should be able to delete all trackers', () => {
    const confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockReturnValue(true);

    const { getByText, getByTestId, queryByTestId } = component;
    fireEvent.click(getByText('Delete Tracker'));
    fireEvent.click(getByTestId(hip4120testId));
    fireEvent.click(getByText('Delete Tracker'));

    expect(queryByTestId(bbtestId)).toBeFalsy();
    expect(queryByTestId(hip4120testId)).toBeFalsy();
    expect(getByTestId('massacretab-add')).toBeTruthy();
    expect(getByTestId('massacretab-add')).toHaveClass('Mui-selected');
  });
});
