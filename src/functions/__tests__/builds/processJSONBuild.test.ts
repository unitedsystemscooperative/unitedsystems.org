import cleversBuild from 'data/builds/testBuilds/testBuildClever.json';
import corvetteMiningBuild from 'data/builds/testBuilds/testCorvetteMiner.json';
import cleverPrismaticBuild from 'data/builds/testBuilds/testBuildCleverPrismatic.json';
import cleverPowerplayBuild from 'data/builds/testBuilds/testBuildCleverPP.json';
import { processJSONBuild } from 'functions/builds';

describe('processJSONBuild', () => {
  it(`should process Clever's build with no powerplay or guardian`, () => {
    try {
      const {
        buildName,
        // shipID,
        hasGuardian,
        hasPowerplay,
        engineering,
        url,
      } = processJSONBuild(JSON.stringify(cleversBuild));

      expect(buildName).toBe('Moderately Engineered Krait MK2');
      expect(engineering).toBe(true);
      expect(hasGuardian).toBe(false);
      expect(hasPowerplay).toBe(false);
      expect(url).toBeDefined();
      // expect(shipName).toBe('Krait Mk II');
    } catch (e) {
      fail(e);
    }
  });

  it(`should process the Federal Corvette Mining Build`, () => {
    try {
      const {
        buildName,
        // shipID,
        hasGuardian,
        hasPowerplay,
        engineering,
        url,
      } = processJSONBuild(JSON.stringify(corvetteMiningBuild));

      expect(buildName).toBe('Corvette Miner');
      expect(engineering).toBe(true);
      expect(hasGuardian).toBe(true);
      expect(hasPowerplay).toBe(false);
      expect(url).toBeDefined();
      // expect(shipName).toBe('Federal Corvette');
    } catch (e) {
      throw new Error('test failed' + e.message);
    }
  });

  it(`should process Clever's Prismatic Build`, () => {
    try {
      const {
        buildName,
        // shipID,
        hasGuardian,
        hasPowerplay,
        engineering,
        url,
      } = processJSONBuild(JSON.stringify(cleverPrismaticBuild));

      expect(buildName).toBe('Cleverape 5.3 Prismatic Tank');
      expect(engineering).toBe(true);
      expect(hasGuardian).toBe(true);
      expect(hasPowerplay).toBe(true);
      expect(url).toBeDefined();
      // expect(shipName).toBe('Federal Corvette');
    } catch (e) {
      throw new Error('test failed' + e.message);
    }
  });
  it(`should process the clever's PowerPlay Build`, () => {
    try {
      const {
        buildName,
        // shipID,
        hasGuardian,
        hasPowerplay,
        engineering,
        url,
      } = processJSONBuild(JSON.stringify(cleverPowerplayBuild));

      expect(buildName).toBe('Courier Bubble Hopper V4.1');
      expect(engineering).toBe(true);
      expect(hasGuardian).toBe(true);
      expect(hasPowerplay).toBe(true);
      expect(url).toBeDefined();
      // expect(shipName).toBe('Imperial Courier');
    } catch (e) {
      throw new Error('test failed' + e.message);
    }
  });
});
