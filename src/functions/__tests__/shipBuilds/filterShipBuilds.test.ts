import shipBuildJSON from 'data/shipBuilds/builds.json';
import { getShipInfofromID } from 'functions/shipBuilds';
import { filterShipBuilds } from 'functions/shipBuilds/filterShipBuilds';
import { IBuildInfov2, IQuery, ShipSize } from 'models/shipBuilds';

describe('filterShipBuilds', () => {
  const shipBuilds: IBuildInfov2[] = shipBuildJSON;

  it('should filter only variants', () => {
    const query: IQuery = {
      ship: null,
      size: null,
      specialties: [],
      engLevel: null,

      guardian: null,
      powerplay: null,
      beginner: null,
      showVariants: null,
    };
    const expectedResult = shipBuilds.filter((x) => x.isVariant === false);

    const result = filterShipBuilds(shipBuilds, query);

    expect(result).toEqual(expectedResult);

    query.showVariants = false;

    const result2 = filterShipBuilds(shipBuilds, query);

    expect(result2).toEqual(expectedResult);
  });

  it('should filter to alliance chieftains', () => {
    const query: IQuery = {
      ship: 'alliance_chieftain',
      size: null,
      specialties: [],
      engLevel: null,

      guardian: null,
      powerplay: null,
      beginner: null,
      showVariants: null,
    };
    const expectedResult = shipBuilds.filter(
      (x) => x.shipId === 'alliance_chieftain'
    );

    const result = filterShipBuilds(shipBuilds, query);

    expect(result).toEqual(expectedResult);
  });

  it('should filter to small ships', () => {
    const query: IQuery = {
      ship: null,
      size: 1,
      specialties: [],
      engLevel: null,

      guardian: null,
      powerplay: null,
      beginner: null,
      showVariants: null,
    };
    const expectedResult = shipBuilds.filter((x) => {
      const shipInfo = getShipInfofromID(x.shipId);
      if (shipInfo?.size === ShipSize.S) {
        return x;
      } else {
        return undefined;
      }
    });

    const result = filterShipBuilds(shipBuilds, query);
    expect(result).toEqual(expectedResult);
  });

  it('should filter to same eng level', () => {
    const query: IQuery = {
      ship: null,
      size: null,
      specialties: [],
      engLevel: 0,

      guardian: null,
      powerplay: null,
      beginner: null,
      showVariants: null,
    };
    const expectedResult = shipBuilds.filter((x) => x.engLevel === 0);

    const result = filterShipBuilds(shipBuilds, query);
    expect(result).toEqual(expectedResult);
  });

  it('should filter to same specialty', () => {
    const query: IQuery = {
      ship: null,
      size: null,
      specialties: ['Jump Ship'],
      engLevel: null,
      guardian: null,
      powerplay: null,
      beginner: null,
      showVariants: null,
    };
    const expectedResult = shipBuilds.filter((x) =>
      x.specializations.includes('Jump Ship')
    );

    const result = filterShipBuilds(shipBuilds, query);
    expect(result).toEqual(expectedResult);
  });

  it('should filter to same specialties', () => {
    const query: IQuery = {
      ship: null,
      size: null,
      specialties: ['Combat - PvE', 'Combat - PvP'],
      engLevel: null,
      guardian: null,
      powerplay: null,
      beginner: null,
      showVariants: null,
    };
    const expectedResult = shipBuilds
      .filter((x) => x.specializations.includes('Combat - PvE'))
      .filter((x) => x.specializations.includes('Combat - PvP'));

    const result = filterShipBuilds(shipBuilds, query);
    expect(result).toEqual(expectedResult);
  });

  it('should filter guardian', () => {
    const query: IQuery = {
      ship: null,
      size: null,
      specialties: [],
      engLevel: null,
      guardian: 1,
      powerplay: null,
      beginner: null,
      showVariants: null,
    };
    const expectedResult = shipBuilds.filter((x) => x.hasGuardian === true);

    const result = filterShipBuilds(shipBuilds, query);
    expect(result).toEqual(expectedResult);

    query.guardian = 0;

    const expectedResult2 = shipBuilds.filter((x) => x.hasGuardian === false);
    const result2 = filterShipBuilds(shipBuilds, query);
    expect(result2).toEqual(expectedResult2);
  });

  it('should filter powerplay', () => {
    const query: IQuery = {
      ship: null,
      size: null,
      specialties: [],
      engLevel: null,
      guardian: null,
      powerplay: 1,
      beginner: null,
      showVariants: null,
    };
    const expectedResult = shipBuilds.filter((x) => x.hasPowerplay === true);

    const result = filterShipBuilds(shipBuilds, query);
    expect(result).toEqual(expectedResult);

    query.powerplay = 0;

    const expectedResult2 = shipBuilds.filter((x) => x.hasPowerplay === false);
    const result2 = filterShipBuilds(shipBuilds, query);
    expect(result2).toEqual(expectedResult2);
  });

  it('should filter beginner', () => {
    const query: IQuery = {
      ship: null,
      size: null,
      specialties: [],
      engLevel: null,
      guardian: null,
      powerplay: null,
      beginner: 1,
      showVariants: null,
    };
    const expectedResult = shipBuilds.filter((x) => x.isBeginner === true);

    const result = filterShipBuilds(shipBuilds, query);
    expect(result).toEqual(expectedResult);

    query.beginner = 0;

    const expectedResult2 = shipBuilds.filter((x) => x.isBeginner === false);
    const result2 = filterShipBuilds(shipBuilds, query);
    expect(result2).toEqual(expectedResult2);
  });
});
