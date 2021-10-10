import { Link } from '@mui/material';
import { PaperP2 } from 'components/_common/paper';
import { CenteredTypography } from 'components/_common/typography';

/** Acknowledges where the Images on the Build System come from. */
export const ShipImgAcknowledgement = () => {
  return (
    <PaperP2>
      <CenteredTypography variant="subtitle2">
        Ship Image by <Link href="https://forums.frontier.co.uk/member.php/118579-Qohen-Leth">CMDR Qohen Leth</Link> via
        Copyright CC BY-NC-SA 4.0 (available on <Link href="https://edassets.org">edassets.org</Link>)
      </CenteredTypography>
    </PaperP2>
  );
};
