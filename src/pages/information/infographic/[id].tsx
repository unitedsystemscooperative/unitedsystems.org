/* eslint-disable @next/next/no-img-element */
// Can't get this Image to format correctly when using next/image.
import { Container, Typography } from '@mui/material';
import { PrimaryLayout } from 'components/layouts/primary';
import { infoGraphics } from 'data/information/infographicList';
import Head from 'next/head';

/**
 * Displays an infographic
 * @param props imgID to display
 */
const Infographic = ({
  infographic,
}: {
  infographic: { id: string; title: string; img: string };
}) => {
  return (
    <>
      <Head>
        <title>USC Infographic</title>
        <meta name="description" content="Infographic" />
      </Head>
      <PrimaryLayout>
        <Container sx={{ textAlign: 'center' }} maxWidth="lg">
          {infographic ? (
            <>
              <Typography variant="h3">{infographic.title}</Typography>
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
