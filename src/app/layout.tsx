import { theme } from '@/theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Roboto } from 'next/font/google';
import { AuthSessionProvider } from './_components/auth-session-provider';
import { Navbar } from './_components/navbar';
import { Footer } from './_components/footer';
import info from '../../package.json';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthSessionProvider>
              <CssBaseline />
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <Box component="main" sx={{ mt: 0, mb: 2 }}>
                  {children}
                </Box>
                <Footer version={info.version} />
              </Box>
            </AuthSessionProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
