export interface ISystemStations {
  id: number;
  name: string;
  stations: IStations[];
}

export interface IStations {
  type: string;
  name: string;
  distanceToArrival: number;
}
