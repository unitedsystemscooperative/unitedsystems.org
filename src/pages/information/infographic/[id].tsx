import { Container, Typography } from '@mui/material';
import { infoGraphics } from 'data/information/infographicList';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

/**
 * Displays an infographic
 * @param props imgID to display
 */
const InfographicPage = ({
  infographic,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>USC Infographic</title>
        <meta name="description" content="Infographic" />
      </Head>
      <Container sx={{ textAlign: 'center' }} maxWidth="lg">
        {infographic ? (
          <>
            <Typography variant="h3">{infographic.title}</Typography>
            <Image
              src={infographic.img}
              alt={infographic.title}
              height={infographic.height}
              width={infographic.width}
            />
          </>
        ) : (
          <Typography>Image not found</Typography>
        )}
      </Container>
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

export default InfographicPage;
