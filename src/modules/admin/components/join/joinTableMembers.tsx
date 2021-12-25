import { copytoClipboard } from '@/functions/copytoClipboard';
import { useCMDRs } from '@/hooks/useCmdrs';
import { MemberDialog } from '~/admin/components/cmdrs/dialogs/memberDialog';
import {
  IMember,
  PlatformString,
  Rank,
  ReferralString,
  Region,
  RegionString,
} from '~/admin/models';
import { IJoinRequest } from '~/join/models/joinRequest';
import { Add, FileCopy } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export const MembersTable = ({ members }: { members: IJoinRequest[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialog, setDialog] = useState(false);
  const [dialogVal, setDialogVal] = useState<IMember>(null);
  const { addCMDR } = useCMDRs();
  const { enqueueSnackbar } = useSnackbar();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddMember = (joinInfo: IJoinRequest) => {
    const newMember: IMember = {
      cmdrName: joinInfo.cmdr.toUpperCase(),
      discordName: joinInfo.discord,
      discordJoinDate: null,
      joinDate: new Date(),
      platform: joinInfo.platform,
      rank: Rank.Cadet,
      region: joinInfo.region ?? Region.N_CAmerica,
      ref1: joinInfo.referral,
      ref2: joinInfo.referral2,
      entersVoice: false,
      isInInaraSquad: false,
    };
    setDialogVal(newMember);
    setDialog(true);
  };
  const onDialogClose = (value?: IMember) => {
    console.log({ value });
    if (value) {
      try {
        addCMDR(value);
        enqueueSnackbar('Added Cmdr', { variant: 'success' });
        setDialog(false);
      } catch (e) {
        enqueueSnackbar(`Failed to add or update CMDR. Reason: ${e.message}`, {
          variant: 'error',
        });
      }
    } else {
      setDialog(false);
    }
  };

  const processLength = (length: string) => {
    switch (length) {
      case 'lessthanMonth':
        return '< 1 Month';
      case 'morethanMonth':
        return '> 1 Month';
      case 'morethan6Month':
        return '> 6 Months';
      case 'morethan1Year':
        return '> 1 Year';
      default:
        return '';
    }
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>TimeStamp</TableCell>
                <TableCell>CMDR</TableCell>
                <TableCell>Discord</TableCell>
                <TableCell>Platform</TableCell>
                <TableCell>Playing Length</TableCell>
                <TableCell>Referral</TableCell>
                <TableCell>Referral2</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Add to Dashboard</TableCell>
              </TableRow>
            </TableHead>
            {members && (
              <TableBody>
                {members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((map) => (
                  <TableRow key={`${map.discord} ${map.timeStamp}`}>
                    <TableCell>{new Date(map.timeStamp).toUTCString()}</TableCell>
                    <TableCell>
                      <div>
                        {map.cmdr}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => copytoClipboard(map.cmdr.toUpperCase())}>
                          <FileCopy />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {map.discord}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => copytoClipboard(map.discord)}>
                          <FileCopy />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>{PlatformString[map.platform]}</TableCell>
                    <TableCell>{processLength(map.playingLength)}</TableCell>
                    <TableCell>{ReferralString[map.referral]}</TableCell>
                    <TableCell>{map.referral2}</TableCell>
                    <TableCell>{map.region ? RegionString[map.region] : map.timezone}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleAddMember(map)} size="large">
                        <Add />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={members.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <MemberDialog open={dialog} values={[dialogVal]} onClose={onDialogClose} />
    </>
  );
};
