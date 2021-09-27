import {
  getSystemsinSphere,
  getFactionsinSystem,
  getStationsinSystem,
} from './edsmQueries';
import { genericSortArray } from './sort';

export const processHazRezSystem = async (system: string) => {
  const systemsInSphere = await getSystemsinSphere(system, 10);
  const populatedSystems = systemsInSphere.filter(
    (x) => Object.keys(x.information).length > 0
  );
  const systems = await Promise.all(
    populatedSystems.map(async (x) => {
      const factionsinSystem = await getFactionsinSystem(x.name);
      const factions = factionsinSystem.factions
        .map((faction) => {
          const name = faction.name;
          const id = faction.id;
          const influence = faction.influence;
          const removed = false;
          return { name, id, influence, removed };
        })
        .filter((faction) => faction.influence > 0)
        .sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });

      const stationsinSystem = await getStationsinSystem(x.name);
      const stations = stationsinSystem.stations
        .filter(
          (station) =>
            station.type !== 'Fleet Carrier' &&
            station.type !== 'Odyssey Settlement'
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

      return { name: x.name, factions, stations: sortedStations };
    })
  );
  return systems;
};
