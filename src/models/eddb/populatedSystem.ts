export interface IEDDBPopulatedSystem {
  id: number;
  edsm_id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  distance?: number;
  population: number;
  is_populated: boolean;
  government_id: number;
  government: string;
  allegiance_id: number;
  allegiance: string;
  states: IEDDBFactionState[];
  security_id: number;
  security: string;
  primary_economy_id: number;
  primary_economy: string;
  power: string;
  power_state: string;
  power_state_id: number;
  needs_permit: boolean;
  updated_at: number;
  minor_factions_updated_at: number;
  simbad_ref: string;
  controlling_minor_faction_id: number;
  controlling_minor_faction: string;
  reserve_type_id: number;
  reserve_type: string;
  minor_faction_presences: {
    happiness_id: number;
    minor_faction_id: number;
    influence: number;
    active_states: IEDDBFactionState[];
    pending_states: IEDDBFactionState[];
    recovering_states: IEDDBFactionState[];
  }[];
  ed_system_address: number;
}

export interface IEDDBFactionState {
  id: number;
  name: string;
}
