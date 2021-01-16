import {
  ICoriolisLoadout,
  IShipCoreModules,
  IShipHardpoints,
  IShipInternalModules,
} from 'models/shipBuilds/coriolis';

export const processJSONBuild = (
  json: string
): {
  buildName: string;
  shipID: string;
  hasGuardian: boolean;
  hasPowerplay: boolean;
  engineering: boolean;
  url: string;
} => {
  const build: ICoriolisLoadout = JSON.parse(json);

  const buildName = build.name;
  const shipID = build.references[0].shipId ?? '';
  const url = build.references[0].url ?? '';

  const components = build.components;
  const core = components.standard;
  const hardpoints = components.hardpoints;
  const internals = components.internal;

  // Check for Guardian
  const guardian = checkGuardian(core, hardpoints, internals);

  // Check for PowerPlay
  const powerplay = checkPowerplay(internals, hardpoints);

  // Check for engineering
  const engineering = checkEngineering(hardpoints, internals, core);

  return {
    buildName,
    shipID,
    hasGuardian: guardian,
    hasPowerplay: powerplay,
    engineering,
    url,
  };
};

/**
 * Check for Engineered modules, except the armor
 * @param hardpoints
 * @param internals
 * @param core
 */
const checkEngineering = (
  hardpoints: IShipHardpoints,
  internals: IShipInternalModules,
  core: IShipCoreModules
) => {
  let engineering = false;
  const weaponEng = hardpoints.filter((hp) => hp?.blueprint);
  const internalEng = internals.filter((i) => i?.blueprint);
  const ppEng = core.powerPlant.blueprint;
  const thrustEng = core.thrusters.blueprint;
  const fsdEng = core.frameShiftDrive.blueprint;
  const lifeEng = core.lifeSupport.blueprint;
  const pdEng = core.powerDistributor.blueprint;
  const sensorEng = core.sensors.blueprint;
  if (
    weaponEng.length > 0 ||
    internalEng.length > 0 ||
    ppEng ||
    thrustEng ||
    fsdEng ||
    lifeEng ||
    pdEng ||
    sensorEng
  ) {
    engineering = true;
  }
  return engineering;
};

/**
 * Check for Powerplay modules
 * @param internals
 * @param hardpoints
 */
const checkPowerplay = (
  internals: IShipInternalModules,
  hardpoints: IShipHardpoints
) => {
  let powerplay = false;
  const powerplayWeaponNames = [
    'disruptor',
    'imperial hammer',
    'pack-hound',
    'mining lance',
    'enforcer',
    'cytoscrambler',
    'retributor',
    'advanced plasma accelerator',
    'pacifier',
    'rocket propelled fsd disruptor',
  ];
  const powerplayInternals = internals.find((x) =>
    x?.group?.toLowerCase().startsWith('prismatic')
  );
  if (powerplay === false && powerplayInternals) {
    powerplay = true;
  }
  powerplayWeaponNames.forEach((x) => {
    if (powerplay === false) {
      const powerplayHardpoint = hardpoints.find(
        (hp) => hp?.name?.toLowerCase() === x.toLowerCase()
      );
      powerplay = powerplayHardpoint ? true : false;
    }
  });
  return powerplay;
};

/**
 * Check for Guardian modules/weapons
 * @param core
 * @param hardpoints
 * @param internals
 */
const checkGuardian = (
  core: IShipCoreModules,
  hardpoints: IShipHardpoints,
  internals: IShipInternalModules
) => {
  let guardian = false;
  const ppName = (core.powerPlant.name as string) ?? '';
  const pdName = (core.powerDistributor.name as string) ?? '';
  const guardianHardPoints = hardpoints.find((x) =>
    x?.group?.toLowerCase().startsWith('guardian')
  );
  const guardianInternals = internals.find((x) =>
    x?.group?.toLowerCase().startsWith('guardian')
  );
  if (
    ppName.toLowerCase().startsWith('guardian') ||
    pdName.toLowerCase().startsWith('guardian') ||
    guardianHardPoints ||
    guardianInternals
  ) {
    guardian = true;
  }
  return guardian;
};
