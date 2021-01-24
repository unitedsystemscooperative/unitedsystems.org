export interface IMember {
  _id: string;
  role: 'member' | 'high command';
  cmdr: string;
  email: string;
}
