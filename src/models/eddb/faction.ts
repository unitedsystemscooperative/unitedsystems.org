export interface IEDDBFaction {
  id: number;
  name: string;
  updated_at: number;
  government_id: number;
  government: string;
  allegiance_id: number;
  allegiance: string;
  home_system_id: number;
  is_player_faction: boolean;
}
