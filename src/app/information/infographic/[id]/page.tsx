import { infoGraphics } from '../../_data/infographicList';
import { Container, Typography } from '@mui/material';
import { Metadata } from 'next';
import Head from 'next/head';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'USC Infographic',
  description: 'USC Infographic',
};

export function generateStaticParams() {
  return infoGraphics.map((infographic) => ({ id: infographic.id }));
}

/**
 * Displays an infographic
 * @param props imgID to display
 */
export default function InfographicPage({ params }: { params: { id: string } }) {
  const infographic = infoGraphics.find((x) => params.id === x.id);
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
}
