export interface ISystemStations {
  id: number;
  id64: number;
  url: string;
  name: string;
  stations: IStations[];
}

export interface IStations {
  id: number;
  marketId: number;
  type: string;
  name: string;
  body?: { id: number; name: string; latitude?: number; longitude?: number };
  distanceToArrival: number;
  allegiance: string;
  government: string;
  economy: string;
  secondEconomy: string;
  haveMarket: boolean;
  haveShipyard: boolean;
  haveOutfitting: boolean;
  otherServices: string[];
  controllingFaction?: { id: number; name: string };
  updateTime: {
    information: string;
    market: string;
    shipyard: string;
    outfitting: string;
  };
}
