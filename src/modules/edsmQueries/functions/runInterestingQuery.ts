import { ISphereSystem } from '~/edsmQueries/models/sphereSystems.model';
import { BehaviorSubject } from 'rxjs';
import { getBodiesinSystem } from './getBodiesinSystem';
import { getFactionsinSystem } from './getFactionsinSystem';
import { getStationsinSystem } from './getStationsinSystem';
import { getStationSize } from './getStationSize';
import { getSystemsinSphere } from './getSystemsinSphere';

const interestingQueryProgress = new BehaviorSubject('');

const runInterestingQuery = async (referenceSystem: string | string[], range = 50) => {
  interestingQueryProgress.next('Starting Interesting Query');
  let systemList: ISphereSystem[] = [];
  if (Array.isArray(referenceSystem)) {
    interestingQueryProgress.next(`Processing Array of systems.`);
    for (const system of referenceSystem) {
      interestingQueryProgress.next(`Processing Sphere for ${system}`);
      let tempList = await getSystemsinSphere(system, range);
      tempList = tempList.filter((s) => Object.keys(s.information).length !== 0);

      for (const sys of tempList) {
        if (systemList.findIndex((x) => x.name === sys.name) === -1) {
          systemList = [...systemList, sys];
        }
      }
    }
  } else {
    interestingQueryProgress.next(`Processing Sphere for ${referenceSystem}`);
    systemList = await getSystemsinSphere(referenceSystem, range);
    systemList = systemList.filter((s) => Object.keys(s.information).length !== 0);
  }

  let results = [];
  for (const system of systemList) {
    const systemName = system.name;
    const distance = system.distance;
    let shouldList = false;
    interestingQueryProgress.next(`Processing System: ${systemName}`);

    interestingQueryProgress.next(`Processing System: ${systemName}: Stations`);
    const systemStation = await getStationsinSystem(systemName);
    let hasStations = false;
    for (const station of systemStation.stations) {
      if (getStationSize(station.type) === 'Large') {
        shouldList = true;
        hasStations = true;
        break;
      }
    }

    interestingQueryProgress.next(`Processing System: ${systemName}: Bodies`);
    const systemBody = await getBodiesinSystem(systemName);
    let hasBodies = false;
    for (const body of systemBody.bodies) {
      if (
        body.type.toLowerCase() === 'planet' &&
        !body.subType.toLowerCase().includes('gas giant')
      ) {
        shouldList = true;
        hasBodies = true;
        break;
      }
    }

    if (shouldList === true) {
      interestingQueryProgress.next(`Processing System: ${systemName}: Finalizing`);
      const systemFactions = await getFactionsinSystem(systemName);
      const result = {
        systemName,
        distance,
        systemFactions,
        hasStations,
        hasBodies,
        data: {
          systemStation,
          systemBody,
        },
      };
      results = [...results, result];
    }
  }
  return JSON.stringify(results);
};

export { runInterestingQuery, interestingQueryProgress };
