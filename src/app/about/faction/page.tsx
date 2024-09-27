import { getSystems } from '@/app/api/systems/route';
import { buildInaraLink } from '@/functions/buildInaraLink';
import {
  Container,
  Fade,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import { System } from '../_models/system';

export const metadata: Metadata = {
  title: 'United Systems Cooperative Faction Information',
  description: 'USC Faction Information',
};

const SystemList = ({ title, systems }: { title: string; systems: System[] }) => {
  return (
    <List
      subheader={
        <ListSubheader>
          {title} - {systems.length}
        </ListSubheader>
      }>
      {systems.map((system) => (
        <ListItemButton
          key={system.name}
          component={Link}
          href={buildInaraLink('system', system.name)}
          target="_blank">
          <ListItemText primary={system.name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default async function FactionPage() {
  const systems = await getSystems();
  return (
    <>
      <Fade in={true}>
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Faction Information
          </Typography>
          <List component={Paper} sx={{ margin: 'auto' }}>
            <ListItemButton
              component={Link}
              href="https://inara.cz/galaxy-minorfaction/78085/"
              target="_blank">
              <ListItemText primary="United Systems Cooperative - Minor Faction" />
            </ListItemButton>
            {systems && (
              <>
                <SystemList
                  title="Controlled Systems"
                  systems={systems.filter((x) => x.isControlled === true)}
                />
                <SystemList
                  title="Present in Systems"
                  systems={systems.filter((x) => x.isControlled === false)}
                />
              </>
            )}
          </List>
        </Container>
      </Fade>
    </>
  );
}
