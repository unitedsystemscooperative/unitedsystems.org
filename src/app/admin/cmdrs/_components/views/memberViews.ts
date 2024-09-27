import {
  IMember,
  PlatformString,
  RankString,
  ReferralString,
  RegionString,
} from '@/app/admin/_models';
import { handleDate, HeadCell, ViewData } from './commonView';

export const memberDefaultHeadCells: HeadCell<IMember>[] = [
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
  { id: 'joinDate', numeric: false, disablePadding: true, label: 'Join Date' },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  { id: 'rank', numeric: false, disablePadding: true, label: 'Rank' },
  {
    id: 'promotion',
    numeric: false,
    disablePadding: true,
    label: 'Rank Promotion',
  },
  {
    id: 'isInInaraSquad',
    numeric: false,
    disablePadding: true,
    label: 'Inara Squad',
  },
  { id: 'region', numeric: false, disablePadding: true, label: 'Region' },
  {
    id: 'entersVoice',
    numeric: false,
    disablePadding: true,
    label: 'Enters Voice',
  },
  {
    id: 'inaraLink',
    numeric: false,
    disablePadding: true,
    label: 'Inara Link',
  },
];
export const memberDefaultData = (cmdr: IMember): ViewData[] => {
  return [
    { type: 'string', data: cmdr.cmdrName.toUpperCase() },
    { type: 'string', data: cmdr.discordName },
    { type: 'string', data: handleDate(cmdr.joinDate) },
    { type: 'string', data: handleDate(cmdr.discordJoinDate) },
    { type: 'string', data: PlatformString[cmdr.platform] },
    { type: 'string', data: RankString[cmdr.rank] },
    {
      type: 'string',
      data: !isNaN(cmdr.promotion) && cmdr.promotion > -1 ? RankString[cmdr.promotion] : '',
    },
    { type: 'boolean', data: cmdr.isInInaraSquad },
    { type: 'string', data: RegionString[cmdr.region] },
    { type: 'boolean', data: cmdr.entersVoice },
    { type: 'link', data: cmdr.inaraLink },
  ];
};

export const memberDeletedHeadCells: HeadCell<IMember>[] = [
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
  { id: 'joinDate', numeric: false, disablePadding: true, label: 'Join Date' },
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
export const memberDeletedData = (cmdr: IMember): ViewData[] => {
  return [
    { type: 'string', data: cmdr.cmdrName },
    { type: 'string', data: cmdr.discordName },
    { type: 'string', data: handleDate(cmdr.joinDate) },
    { type: 'string', data: handleDate(cmdr.discordJoinDate) },
    { type: 'string', data: PlatformString[cmdr.platform] },
    { type: 'string', data: cmdr.notes },
    { type: 'link', data: cmdr.inaraLink },
  ];
};

export const memberNoteHeadCells: HeadCell<IMember>[] = [
  {
    id: 'cmdrName',
    numeric: false,
    disablePadding: false,
    label: 'CMDR Name',
  },
  { id: 'joinDate', numeric: false, disablePadding: true, label: 'Join Date' },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  { id: 'rank', numeric: false, disablePadding: true, label: 'Rank' },
  {
    id: 'promotion',
    numeric: false,
    disablePadding: true,
    label: 'Rank Promotion',
  },
  { id: 'notes', numeric: false, disablePadding: true, label: 'Note' },
  {
    id: 'inaraLink',
    numeric: false,
    disablePadding: true,
    label: 'Inara Link',
  },
];
export const memberNoteData = (cmdr: IMember): ViewData[] => {
  return [
    { type: 'string', data: cmdr.cmdrName.toUpperCase() },
    { type: 'string', data: handleDate(cmdr.joinDate) },
    { type: 'string', data: handleDate(cmdr.discordJoinDate) },
    { type: 'string', data: PlatformString[cmdr.platform] },
    { type: 'string', data: RankString[cmdr.rank] },
    {
      type: 'string',
      data: !isNaN(cmdr.promotion) && cmdr.promotion > -1 ? RankString[cmdr.promotion] : '',
    },
    { type: 'string', data: cmdr.notes },
    { type: 'link', data: cmdr.inaraLink },
  ];
};

export const memberPromotionHeadCells: HeadCell<IMember>[] = [
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
  { id: 'joinDate', numeric: false, disablePadding: true, label: 'Join Date' },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  { id: 'notes', numeric: false, disablePadding: true, label: 'Note' },
  { id: 'rank', numeric: false, disablePadding: true, label: 'Rank' },
  {
    id: 'promotion',
    numeric: false,
    disablePadding: true,
    label: 'Rank Promotion',
  },
];
export const memberPromotionData = (cmdr: IMember): ViewData[] => {
  return [
    { type: 'string', data: cmdr.cmdrName.toUpperCase() },
    { type: 'string', data: cmdr.discordName },
    { type: 'string', data: handleDate(cmdr.joinDate) },
    { type: 'string', data: handleDate(cmdr.discordJoinDate) },
    { type: 'string', data: PlatformString[cmdr.platform] },
    { type: 'string', data: cmdr.notes },
    { type: 'string', data: RankString[cmdr.rank] },
    {
      type: 'string',
      data: !isNaN(cmdr.promotion) && cmdr.promotion > -1 ? RankString[cmdr.promotion] : '',
    },
  ];
};

export const memberRefHeadCells: HeadCell<IMember>[] = [
  {
    id: 'cmdrName',
    numeric: false,
    disablePadding: false,
    label: 'CMDR Name',
  },
  { id: 'joinDate', numeric: false, disablePadding: true, label: 'Join Date' },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  { id: 'ref1', numeric: false, disablePadding: true, label: 'Reference' },
  { id: 'ref2', numeric: false, disablePadding: true, label: 'Explanation' },
];
export const memberRefData = (cmdr: IMember): ViewData[] => {
  return [
    { type: 'string', data: cmdr.cmdrName.toUpperCase() },
    { type: 'string', data: handleDate(cmdr.joinDate) },
    { type: 'string', data: handleDate(cmdr.discordJoinDate) },
    { type: 'string', data: PlatformString[cmdr.platform] },
    { type: 'string', data: ReferralString[cmdr.ref1] },
    { type: 'string', data: cmdr.ref2 ?? '' },
  ];
};
