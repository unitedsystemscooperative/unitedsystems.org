import { PaperOutlineButton } from '@/app/_components/_common/button';
import { USCMarkdown } from '@/app/_components/uscmarkdown';
import { Container, Divider, Paper, Typography } from '@mui/material';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { getAllReleaseIDs, getReleaseData } from '../_getReleases';

export function generateStaticParams() {
  return getAllReleaseIDs();
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // fetch data
  const releaseData = getReleaseData(params.id);

  return {
    title: releaseData.title,
    description: 'Release of the website',
  };
}

export default async function ReleasePage({ params }: { params: { id: string } }) {
  const releaseData = getReleaseData(params.id);
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 1 }}>
        <NextLink href="/releases" passHref>
          <PaperOutlineButton color="secondary" variant="outlined">
            Return to Releases
          </PaperOutlineButton>
        </NextLink>
        <Paper sx={{ marginTop: 1, padding: 1 }}>
          <Typography variant="h4">{releaseData.title}</Typography>
          <Typography variant="subtitle1">{releaseData.date}</Typography>
          <Divider />
          <USCMarkdown>{releaseData.content}</USCMarkdown>
        </Paper>
      </Container>
    </>
  );
}
