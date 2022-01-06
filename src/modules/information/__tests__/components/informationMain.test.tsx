import { theme } from '@/styles/theme';
import { createMatchMedia } from '@/__mocks__/mediaquery';
import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { InformationMain } from '../../components/informationMain';

const TestComponent = () => (
  <ThemeProvider theme={theme}>
    <InformationMain />
  </ThemeProvider>
);

describe('Information Main', () => {
  it('should render', () => {
    window.matchMedia = createMatchMedia(1200);
    const component = render(<TestComponent />);
    expect(component).toBeTruthy();
  });

  it('should render scroller buttons if mobile', () => {
    window.matchMedia = createMatchMedia(400);
    const { getByText } = render(<TestComponent />);
    expect(getByText('Scroll To:')).toBeInTheDocument();
  });

  it.todo('should scroll to the appropriate location');
});
