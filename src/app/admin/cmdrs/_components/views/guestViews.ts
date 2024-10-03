import { IGuest, PlatformString } from '@/admin/_models';
import { handleDate, HeadCell, ViewData } from './commonView';

export const guestDefaultHeadCells: HeadCell<IGuest>[] = [
  {
    id: 'cmdrName',
    numeric: false,
    disablePadding: false,
    label: 'CMDR Name',
  },
  {
    id: 'discordName',
    numeric: false,
    disablePadding: true,
    label: 'Discord',
  },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  {
    id: 'inaraLink',
    numeric: false,
    disablePadding: true,
    label: 'Inara Link',
  },
  { id: 'notes', numeric: false, disablePadding: true, label: 'Note' },
];
export const guestDefaultData = (cmdr: IGuest): ViewData[] => {
  return [
    { type: 'string', data: cmdr.cmdrName.toUpperCase() },
    { type: 'string', data: cmdr.discordName },
    { type: 'string', data: handleDate(cmdr.discordJoinDate) },
    { type: 'string', data: PlatformString[cmdr.platform] },
    { type: 'link', data: cmdr.inaraLink },
    { type: 'string', data: cmdr.notes },
  ];
};

export const guestDeletedHeadCells: HeadCell<IGuest>[] = [
  {
    id: 'cmdrName',
    numeric: false,
    disablePadding: false,
    label: 'CMDR Name',
  },
  {
    id: 'discordName',
    numeric: false,
    disablePadding: false,
    label: 'Discord Handle',
  },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  { id: 'notes', numeric: false, disablePadding: true, label: 'Note' },
  {
    id: 'inaraLink',
    numeric: false,
    disablePadding: true,
    label: 'Inara Link',
  },
  {
    id: 'isDeleted',
    numeric: false,
    disablePadding: true,
    label: 'Restore',
  },
];

export const guestDeletedData = (cmdr: IGuest): ViewData[] => {
  return [
    { type: 'string', data: cmdr.cmdrName.toUpperCase() },
    { type: 'string', data: cmdr.discordName },
    { type: 'string', data: handleDate(cmdr.discordJoinDate) },
    { type: 'string', data: PlatformString[cmdr.platform] },
    { type: 'link', data: cmdr.inaraLink },
  ];
};
