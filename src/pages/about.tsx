import { Container, makeStyles, Typography } from '@material-ui/core';
import {
  AboutAllies,
  AboutFaction,
  AboutRules,
  Carriers,
} from 'components/about';
import { AboutLinks } from 'components/about/links';
import { PrimaryLayout } from 'components/layouts/primary';
import { useInfoButtons } from 'hooks/useInfoButtons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
}));
export default function About() {
  const classes = useStyles();
  const { uscLinksList } = useInfoButtons();
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.x);
  });

  const renderSwitch = (param: string | string[]) => {
    const queryParam = Array.isArray(param) ? param[0] : param;
    switch (queryParam) {
      case 'rules':
        return <AboutRules />;
      case 'allies':
        return <AboutAllies />;
      case 'faction':
        return <AboutFaction />;
      case 'fc':
        return <Carriers />;
      default:
        return null;
    }
  };

  return (
    <PrimaryLayout>
      <Container maxWidth='md'>
        <Typography variant='h3' className={classes.header}>
          About USC
        </Typography>
        <AboutLinks
          id='usc-links'
          key='usc-links'
          header='USC Links'
          buttons={uscLinksList}
        />
      </Container>
      {renderSwitch(router.query.x)}
    </PrimaryLayout>
  );
}
