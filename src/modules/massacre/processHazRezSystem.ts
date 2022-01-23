import { genericSortArray } from '@/functions/sort';
import {
  getFactionsinSystem,
  getStationsinSystem,
  getSystemsinSphere,
} from '@admiralfeb/ed-calculations/dist/edsmQueries';
import { IFactionMission, IFactionwMissions, IMassacreTrack } from './massacreTrack';
import { ReputationLevels } from './reputationLevels';

export const processHazRezSystem = async (system: string) => {
  const systemsInSphere = await getSystemsinSphere(system, 10);
  const populatedSystems = systemsInSphere.filter((x) => Object.keys(x.information).length > 0);
  const systems = await Promise.all(
    populatedSystems.map(async (x) => {
      const factionsinSystem = await getFactionsinSystem(x.name);
      const factions = factionsinSystem.factions
        .filter((faction) => faction.influence > 0)
        .map((faction) => {
          const name = faction.name;
          const id = faction.id;
          const influence = faction.influence;
          const removed = false;
          return { name, id, influence, removed };
        });

      const sortedFactions = genericSortArray(factions, { order: 'asc', orderBy: 'name' });

      const stationsinSystem = await getStationsinSystem(x.name);
      const stations = stationsinSystem.stations
        .filter(
          (station) => station.type !== 'Fleet Carrier' && station.type !== 'Odyssey Settlement'
        )
        .map((station) => {
          const type = station.type;
          const name = station.name;
          const distance = station.distanceToArrival;
          return { type, name, distance };
        });

      const sortedStations = genericSortArray(stations, {
        orderBy: 'distance',
        order: 'asc',
      });

      return { name: x.name, factions: sortedFactions, stations: sortedStations };
    })
  );

  // TODO: write test to test this function
  const factions = systems.reduce<IFactionwMissions[]>((acc, system) => {
    const newFactions: IFactionwMissions[] = system.factions
      .filter((faction) => !acc.find((x) => x.id === faction.id))
      .map(
        (faction): IFactionwMissions => ({
          name: faction.name,
          id: faction.id,
          removed: false,
          reputation: ReputationLevels.allied,
          missions: new Array<IFactionMission | null>(5).fill(null),
        })
      );
    return [...acc, ...newFactions];
  }, []);

  const final: IMassacreTrack = {
    hazRezSystem: system,
    systemsin10LY: systems,
    factions,
    current: true,
  };

  return final;
};
