import { Container, makeStyles, Typography } from '@material-ui/core';
import { PrimaryLayout } from 'components/layouts/primary';
import { infoGraphics } from 'data/information/infographicList';
import Head from 'next/head';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
});

/**
 * Displays an infographic
 * @param props imgID to display
 */
const Infographic = ({
  infographic,
}: {
  infographic: { id: string; title: string; img: string };
}) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>USC Infographic</title>
        <meta name='description' content='Infographic' />
      </Head>
      <PrimaryLayout>
        <Container className={classes.root}>
          {infographic ? (
            <>
              <Typography variant='h3'>{infographic.title}</Typography>
              <img src={infographic.img} alt={infographic.title} />
            </>
          ) : (
            <Typography>Image not found</Typography>
          )}
        </Container>
      </PrimaryLayout>
    </>
  );
};

export async function getStaticPaths() {
  const paths = infoGraphics.map((infographic) => ({
    params: { id: infographic.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const infographic = infoGraphics.find((x) => params.id === x.id);
  return { props: { infographic } };
}

export default Infographic;
