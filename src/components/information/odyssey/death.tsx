import { Container, Typography } from '@mui/material';
import { IndentedDiv } from 'components/_common/div';
import { PaperP2 } from 'components/_common/paper';
import { CenteredTypography } from 'components/_common/typography';

export const OdysseyDeath = () => {
  return (
    <Container maxWidth="lg">
      <CenteredTypography variant="h4">Death in Odyssey</CenteredTypography>
      <PaperP2>
        <Typography>
          Information in this document regards what happens upon death.
        </Typography>

        <section>
          <Typography variant="h5">Items</Typography>
          <IndentedDiv>
            <Typography variant="h6">Carried Items</Typography>
            <IndentedDiv>
              <Typography>
                Loadout materials (suit, weapons, tools): These items incur no
                cost and retain on death. This includes any engineering specials
                and grades in the loadout.
              </Typography>
              <Typography>
                Any items in the backpack will be lost on death. This includes
                consumables or picked up items from the settlement.
              </Typography>
            </IndentedDiv>
            <Typography variant="h6">Storage</Typography>
            <IndentedDiv>
              <Typography>
                "Storage" refers to a ship or SRV. When you have "boots on the
                ground" (not in a station), you are able to interact with a ship
                or SRV and choose <strong>Manage Inventory</strong>. The ship or
                SRV does not need to belong to you and can even be an Apex
                shuttle.
              </Typography>
              <Typography>
                If you enter any ship or SRV, anything in your backpack will
                deposit into Storage and any consumables will be restocked
                (excepting E-breaches).
              </Typography>
              <Typography>
                Anything in Storage will retain on death as it is not on your
                person.
              </Typography>
            </IndentedDiv>
          </IndentedDiv>
        </section>

        <section>
          <Typography variant="h5">Bounties and Fines</Typography>
          <IndentedDiv>
            <Typography>
              Unlike in Horizons, bounties or fines incurred while on the ground
              will follow you until they are paid off or death occurs.
            </Typography>
          </IndentedDiv>
        </section>

        <section>
          <Typography variant="h5">Missions</Typography>
          <IndentedDiv>
            <Typography>
              Missions will only fail if you die on-site of the mission or if
              you have an item in your possession that must be turned into the
              mission contact.
            </Typography>
          </IndentedDiv>
        </section>
      </PaperP2>
    </Container>
  );
};
