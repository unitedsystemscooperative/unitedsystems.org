export type IMassacreTrack = {
  hazRezSystem: string;
  systemsin10LY: {
    name: string;
    factions: {
      name: string;
      id: number;
      influence: number;
      removed: boolean;
    }[];
    stations: {
      type: string;
      name: string;
      distance: number;
    }[];
  }[];
  factions: IFactionwMissions[];
  current: boolean;
};

export interface IFactionwMissions {
  name: string;
  id: number;
  removed: boolean;
  reputation: string;
  missions: Array<IFactionMission | null>;
}

export interface IFactionMission {
  timeStamp: Date;
  killsforMission: number;
  killsCompleted: number;
}
