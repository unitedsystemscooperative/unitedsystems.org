import { infoGraphics } from '~/information/data/infographicList';
import { Infographic } from '~/information/models/infographic';
import { Container, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

/**
 * Displays an infographic
 * @param props imgID to display
 */
const InfographicPage = ({ infographic }: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticPaths: GetStaticPaths = () => {
  const paths = infoGraphics.map((infographic) => ({
    params: { id: infographic.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ infographic: Infographic }> = ({ params }) => {
  const infographic = infoGraphics.find((x) => params.id === x.id);
  return { props: { infographic } };
};

export default InfographicPage;
