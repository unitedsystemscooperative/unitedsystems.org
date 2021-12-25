import { CenteredTypography } from '@/components/_common';
import { RankData } from '@@/information/data/ranks';
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  styled,
} from '@mui/material';
import Image from 'next/image';

const StyledSection = styled('section')(({ theme }) => ({
  margin: theme.spacing(1),
  flexGrow: 1,
}));

const generatePilotsRankList = (name: string) => {
  return (
    <StyledSection id={name}>
      <CenteredTypography variant="h4">{RankData[name]['name']}</CenteredTypography>
      <List>
        {RankData[name].ranks.map((rank: string, i: number) => (
          <ListItem key={rank + i}>
            <ListItemAvatar sx={{ m: 1 }}>
              <Image src={`/img/ranks/${name}/${i}.png`} alt="" width={75} height={75} />
            </ListItemAvatar>
            <ListItemText primary={rank} />
          </ListItem>
        ))}
      </List>
    </StyledSection>
  );
};
export const Ranks = () => {
  return (
    <Container maxWidth="xl">
      <CenteredTypography variant="h4">Pilots Federation Ranks</CenteredTypography>
      <Paper sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {generatePilotsRankList('combat')}
        {generatePilotsRankList('cqc')}
        {generatePilotsRankList('trade')}
        {generatePilotsRankList('exploration')}
        {generatePilotsRankList('mercenary')}
        {generatePilotsRankList('exobiologist')}
      </Paper>
    </Container>
  );
};
