export interface ISystemFactionInfo {
  id: number;
  id64: number;
  name: string;
  url: string;
  controllingFaction: ControllingFaction;
  factions: Faction[];
}

export interface ControllingFaction {
  id: number;
  name: string;
  allegiance: string;
  government: string;
}

export interface Faction {
  id: number;
  name: string;
  allegiance: string;
  government: string;
  influence: number;
  state: string;
  activeStates: unknown[];
  recoveringStates: unknown[];
  pendingStates: unknown[];
  happiness: string;
  isPlayer: boolean;
  lastUpdate: number;
}
