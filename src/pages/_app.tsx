import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { theme } from 'theme';
import { mdComponents } from 'components/markdown/markdownComponents';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateAdapter from '@date-io/moment';

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
        <meta name="og:image" content="https://unitedsystems.org/uscLogo.png" />
        <link rel="icon" href="/uscLogo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider session={pageProps.session}>
        <MuiPickersUtilsProvider utils={DateAdapter}>
          <SnackbarProvider maxSnack={3}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    </>
  );
}

export default USCApp;
