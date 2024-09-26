'use client';
import { Button, ButtonProps, Container, Paper, styled, Typography } from '@mui/material';
import NextLink from 'next/link';

const Header = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(1),
}));

const AdminPaper = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  '& button': {
    margin: theme.spacing(1),
  },
}));

interface LinkButtonProps extends ButtonProps {
  target?: string;
}
const LinkButton = styled(Button)<LinkButtonProps>(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBlock: theme.spacing(1),
}));

export const AdminDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Header variant="h3">USC Administration</Header>
      <AdminPaper>
        <Header variant="h4">User Management</Header>
        <NextLink href="/admin/cmdrs" passHref>
          <LinkButton variant="outlined" color="primary">
            CMDR Dashboard
          </LinkButton>
        </NextLink>
        <NextLink href="/admin/joinRequests" passHref>
          <LinkButton variant="outlined" color="primary">
            Join Requests
          </LinkButton>
        </NextLink>
        <NextLink href="/admin/vote" passHref>
          <LinkButton variant="outlined" color="primary">
            Vote Assistant
          </LinkButton>
        </NextLink>
      </AdminPaper>
      <AdminPaper>
        <Header variant="h4">Website Management</Header>
        <NextLink href="/admin/allies" passHref>
          <LinkButton variant="outlined" color="primary">
            Allies List
          </LinkButton>
        </NextLink>
        <NextLink href="/admin/fc" passHref>
          <LinkButton variant="outlined" color="primary">
            Fleet Carrier List
          </LinkButton>
        </NextLink>
        <NextLink href="/admin/systems" passHref>
          <LinkButton variant="outlined" color="primary">
            System List
          </LinkButton>
        </NextLink>
        <NextLink href="/admin/builds" passHref>
          <LinkButton variant="outlined" color="primary">
            Build Management
          </LinkButton>
        </NextLink>
      </AdminPaper>
      <AdminPaper>
        <Header variant="h4">Bot Management</Header>
        <LinkButton variant="outlined" color="primary" href="https://carl.gg" target="_blank">
          Carl / COVAS Carl
        </LinkButton>
        <LinkButton variant="outlined" color="primary" href="https://dyno.gg/" target="_blank">
          Dyno / COVAS Archer
        </LinkButton>
        <LinkButton
          variant="outlined"
          color="primary"
          href="https://giveawaybot.party/"
          target="_blank">
          Giveaway Bot
        </LinkButton>
        <LinkButton variant="outlined" color="primary" href="https://mee6.xyz/" target="_blank">
          Mee6
        </LinkButton>
        <LinkButton
          variant="outlined"
          color="primary"
          href="https://monitorss.xyz/"
          target="_blank">
          MonitoRSS
        </LinkButton>
      </AdminPaper>
    </Container>
  );
};
