import DateAdapter from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MDXProvider } from '@mdx-js/react';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { mdComponents } from 'components/markdown/markdownComponents';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import { theme } from 'theme';

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
      </Head>
      <Provider session={pageProps.session}>
        <MuiPickersUtilsProvider utils={DateAdapter}>
          <SnackbarProvider maxSnack={3}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <MDXProvider components={mdComponents}>
                  <Component {...pageProps} />
                </MDXProvider>
              </ThemeProvider>
            </StyledEngineProvider>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    </>
  );
}

export default USCApp;
