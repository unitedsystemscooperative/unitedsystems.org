export interface ISystemBodies {
  id: number;
  name: string;
  bodies: IBodies[];
}

export interface IBodies {
  id: number;
  name: string;
  type: string;
  subType: string;
  rings: [] | undefined;
}
