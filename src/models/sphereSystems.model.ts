export interface ISphereSystem {
  distance: number;
  bodyCount: number;
  name: string;
  coords: ICoords;
  coordsLocked: boolean;
  information: ISysInfo;
  primaryStar: IPrimaryStar;
}

export interface ICoords {
  x: number;
  y: number;
  z: number;
}

export interface ISysInfo {
  allegiance?: null | string;
  government?: null | string;
  faction?: string;
  factionState?: string;
  population: number;
  security?: string;
  economy?: string;
  secondEconomy?: string;
  reserve?: null | string;
}

export interface IPrimaryStar {
  type: string;
  name: string;
  isScoopable: boolean;
}
