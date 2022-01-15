import InformationPage from '@/pages/information/index.page';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';

describe('Information Page', () => {
  it('should render', () => {
    const component = render(
      <ThemeProvider theme={theme}>
        <InformationPage />
      </ThemeProvider>
    );
    expect(component).toBeTruthy();
  });
});
