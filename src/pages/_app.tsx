import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { RealmAppProvider } from 'providers';
import React, { useEffect } from 'react';
import { theme } from 'theme';

const realmID: string | undefined = process.env.NEXT_PUBLIC_REALM_ID;

function USCApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <title>United Systems Cooperative</title>
        <meta
          name="description"
          content="Web site of the United Systems Cooperative"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="uscLogo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel&display=swap"
          rel="stylesheet"
        />
      </Head>
      <RealmAppProvider appId={realmID}>
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </SnackbarProvider>
      </RealmAppProvider>
    </>
  );
}

export default USCApp;
