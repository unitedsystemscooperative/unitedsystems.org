import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { RankData } from 'data/information/ranks';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rank: {
    margin: theme.spacing(1),
    flexGrow: 1,
    // padding: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
  },
}));

export const Ranks = () => {
  const classes = useStyles();

  const generatePilotsRankList = (name: string) => {
    return (
      <section id={name} className={classes.rank}>
        <Typography variant="h4" className={classes.center}>
          {RankData[name]['name']}
        </Typography>
        <List>
          {RankData[name].ranks.map((rank: string, i: number) => (
            <ListItem key={rank + i}>
              <ListItemAvatar className={classes.avatar}>
                <img src={`/img/ranks/${name}/${i}.png`} width="75" />
              </ListItemAvatar>
              <ListItemText primary={rank} />
            </ListItem>
          ))}
        </List>
      </section>
    );
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" className={classes.center}>
        Pilots Federation Ranks
      </Typography>
      <Paper className={classes.paper}>
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
