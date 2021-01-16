import { ShipSize } from '.';
export type IQuery = {
  ship: string | null;
  size: ShipSize | null;
  specialties: string[];
  engLevel: number | null;
  guardian: number | null;
  powerplay: number | null;
  beginner: number | null;
  showVariants: boolean | null;
};
