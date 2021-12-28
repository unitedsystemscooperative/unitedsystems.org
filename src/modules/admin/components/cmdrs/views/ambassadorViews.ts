import { IAmbassador, PlatformString } from '~/admin/models';
import { handleDate, HeadCell, ViewData } from './commonView';

export const ambassadorDefaultHeadCells: HeadCell<IAmbassador>[] = [
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
    id: 'groupRepresented',
    numeric: false,
    disablePadding: true,
    label: 'Group Represented',
  },
  {
    id: 'inaraLink',
    numeric: false,
    disablePadding: true,
    label: 'Group Link',
  },
  { id: 'notes', numeric: false, disablePadding: true, label: 'Note' },
];
export const ambassadorDefaultData = (cmdr: IAmbassador): ViewData[] => {
  return [
    { type: 'string', data: cmdr.cmdrName.toUpperCase() },
    { type: 'string', data: cmdr.discordName },
    { type: 'string', data: handleDate(cmdr.discordJoinDate) },
    { type: 'string', data: PlatformString[cmdr.platform] },
    { type: 'string', data: cmdr.groupRepresented },
    { type: 'link', data: cmdr.inaraLink },
    { type: 'string', data: cmdr.notes },
  ];
};

export const ambassadorDeletedHeadCells: HeadCell<IAmbassador>[] = [
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

export const ambassadorDeletedData = (cmdr: IAmbassador): ViewData[] => {
  return [
    { type: 'string', data: cmdr.cmdrName.toUpperCase() },
    { type: 'string', data: cmdr.discordName },
    { type: 'string', data: handleDate(cmdr.discordJoinDate) },
    { type: 'string', data: PlatformString[cmdr.platform] },
    { type: 'link', data: cmdr.inaraLink },
  ];
};
