import { getSystemsinSphere } from './edsmQueries';
import systemJSON from 'data/gameData/systems_populated.json';
import factionJSON from 'data/gameData/factions.json';
import { IEDDBPopulatedSystem } from 'models/eddb/populatedSystem';
import { IEDDBFaction } from 'models/eddb/faction';
import { genericSortArray } from './sort';

const EDDB_API = 'https://eddb.io/archive/v6/';

export const calculateExpansion = async (
  sourceSystem: string,
  factionExpanding: string,
  isInvestmentStatus: boolean = false
) => {
  // Get the info from EDDB (System and Faction)
  const { systems, factions } = await getEddbInformation();
  const sourceSystemInfo = systems.find(
    (x) => x.name.toLowerCase().trim() === sourceSystem.toLowerCase().trim()
  );
  if (sourceSystemInfo === undefined)
    throw new Error('Source system not found.');

  const factionInfo = factions.find(
    (x) => x.name.toLowerCase().trim() === factionExpanding.toLowerCase().trim()
  );
  if (factionInfo === undefined) throw new Error('Faction not found');

  // Check if the faction exists in the source system.
  if (
    sourceSystemInfo.minor_faction_presences.find(
      (x) => x.minor_faction_id === factionInfo.id
    ) === undefined
  )
    throw new Error('Faction not present in source system.');

  // Get systems within expansion range.
  const expansionDistance = isInvestmentStatus ? 30 : 20;
  const systemsinSphere = (
    await getSystemsinSphere(sourceSystem, expansionDistance)
  )
    .filter((x) => Object.keys(x.information).length !== 0)
    .map((x) => {
      console.log({ x });
      const sys = systems.find(
        (y) => y.name.toLowerCase().trim() === x.name.toLowerCase().trim()
      );
      console.log({ sys });
      sys.distance = x.distance;
      return sys;
    });

  const potentialSystems = genericSortArray(
    systemsinSphere.filter(
      (x) =>
        !x.minor_faction_presences.find(
          (y) => y.minor_faction_id === factionInfo.id
        )
    ),
    { order: 'asc', orderBy: 'distance' }
  );

  const systemsWLessThan7Factions = potentialSystems.filter(
    (x) => x.minor_faction_presences.length < 7
  );
  if (systemsWLessThan7Factions.length > 0) {
    // Note that this does not take retreats into account.
    return formatData(systemsWLessThan7Factions, factions);
  } else {
    // Return systems based upon Invasion mechanic
    const systemsWNonNativeFactions = potentialSystems.filter((system) => {
      const systemId = system.id;
      const nonNativeFactions = system.minor_faction_presences.filter(
        (faction) => {
          const factionId = faction.minor_faction_id;
          return (
            factions.find((x) => x.id === factionId).home_system_id !== systemId
          );
        }
      );
      return nonNativeFactions.length > 0;
    });

    if (systemsWNonNativeFactions.length > 0) {
      return formatData(systemsWNonNativeFactions, factions);
    }
    return [];
  }
};

const getEddbInformation = async (): Promise<{
  systems: IEDDBPopulatedSystem[];
  factions: IEDDBFaction[];
}> => {
  const sysData = systemJSON as IEDDBPopulatedSystem[];
  const facData = factionJSON as IEDDBFaction[];

  return { systems: sysData, factions: facData };
};

const formatData = (
  potentialSystems: IEDDBPopulatedSystem[],
  factions: IEDDBFaction[]
) => {
  const data = potentialSystems.map((system) => {
    const systemName = system.name;
    const distance = system.distance;
    const isPFPresent = system.minor_faction_presences.some((faction) => {
      const factionId = faction.minor_faction_id;
      return factions.find((x) => x.id === factionId).is_player_faction;
    });
    const lowestINF = genericSortArray(
      system.minor_faction_presences.map((faction) => {
        const factionId = faction.minor_faction_id;
        const factionName = factions.find((x) => x.id === factionId).name;
        const INF = faction.influence;
        return { factionName, INF };
      }),
      { order: 'asc', orderBy: 'INF' }
    )[0];
    const lastUpdated = new Date(system.minor_factions_updated_at * 1000);
    return { systemName, distance, isPFPresent, lowestINF, lastUpdated };
  });
  return data;
};
