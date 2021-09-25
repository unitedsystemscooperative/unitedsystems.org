import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { MDXProvider } from '@mdx-js/react';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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

const USCEmotionCache = createCache({ key: 'css' });

interface USCAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const USCApp = ({
  Component,
  emotionCache = USCEmotionCache,
  pageProps,
}: USCAppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <CacheProvider value={emotionCache}>
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
        <LocalizationProvider dateAdapter={DateAdapter} locale="en-ca">
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
        </LocalizationProvider>
      </Provider>
    </CacheProvider>
  );
};

export default USCApp;
