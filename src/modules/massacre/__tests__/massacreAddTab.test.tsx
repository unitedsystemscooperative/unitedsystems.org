import { ISystemFactionInfo } from '@/modules/edsmQueries/models/faction.model';
import { ISphereSystem } from '@/modules/edsmQueries/models/sphereSystems.model';
import { ISystemStations } from '@/modules/edsmQueries/models/stationsInSystem';
import { theme } from '@/styles/theme';
import { server } from '@/__mocks__/server/server';
import { ThemeProvider } from '@mui/material';
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { RequestHandler, rest } from 'msw';
import { MassacreKillTracker } from '../components/massacreKillTracker';

const mockenqueueSnackbar = jest.fn();
jest.mock('notistack', () => ({
  useSnackbar() {
    return {
      enqueueSnackbar: mockenqueueSnackbar ?? jest.fn(),
    };
  },
}));

const TestComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <MassacreKillTracker />
    </ThemeProvider>
  );
};

describe('Massacre Add Tab', () => {
  let component: RenderResult;
  beforeEach(() => {
    component = render(<TestComponent />);
  });

  it('should show a message if the field is blank', () => {
    const { getByTestId } = component;
    fireEvent.click(getByTestId('massacretab-add'));
    fireEvent.click(getByTestId('system-submit'));
    expect(mockenqueueSnackbar).toHaveBeenCalledWith('Please enter a system', {
      variant: 'warning',
    });
  });

  it('should not add an already existing tab', () => {
    const { getByLabelText, getByTestId } = component;
    fireEvent.click(getByTestId('massacretab-add'));
    fireEvent.input(getByLabelText('HazRez System'), { target: { value: 'Bibaridji' } });
    fireEvent.click(getByTestId('system-submit'));
    expect(mockenqueueSnackbar).toHaveBeenCalledWith('That tracker already exists', {
      variant: 'info',
    });
  });

  it('should add a system tab', async () => {
    const testSphereSystems: ISphereSystem[] = [
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
        distance: 0,
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
    const requestHandlers: RequestHandler[] = [
      rest.get('https://www.edsm.net/api-v1/sphere-systems', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(testSphereSystems));
      }),
      rest.get('https://www.edsm.net/api-system-v1/factions', (req, res, ctx) => {
        const systemName = req.url.searchParams.get('systemName').toLowerCase();
        switch (systemName) {
          case 'hip 3551':
            return res(ctx.status(200), ctx.json(hip3551FactionInfo));
          default:
            return res(ctx.status(500), ctx.json({ errorMessage: 'system not found' }));
        }
      }),
      rest.get('https://www.edsm.net/api-system-v1/stations', (req, res, ctx) => {
        const systemName = req.url.searchParams.get('systemName').toLowerCase();
        switch (systemName) {
          case 'hip 3551':
            return res(ctx.status(200), ctx.json(hip3551StationInfo));
          default:
            return res(ctx.status(500), ctx.json({ errorMessage: 'system not found' }));
        }
      }),
    ];

    server.use(...requestHandlers);

    const { getByLabelText, getByTestId } = component;

    fireEvent.click(getByTestId('massacretab-add'));
    fireEvent.input(getByLabelText('HazRez System'), { target: { value: 'Arugbal' } });
    fireEvent.click(getByTestId('system-submit'));

    await waitFor(() => {
      expect(getByTestId('massacretab-ARUGBAL')).toBeTruthy();
      expect(getByTestId('massacretab-ARUGBAL')).toHaveClass('Mui-selected');
      expect(getByTestId('massacretab-add')).not.toHaveClass('Mui-selected');
    });
  });
});
