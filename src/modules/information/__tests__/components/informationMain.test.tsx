import { theme } from '@/styles/theme';
import { createMatchMedia } from '@/__mocks__/mediaquery';
import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import { InformationMain } from '../../components/informationMain';
import * as scrollFn from '@/functions/scrolltoRef';

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

  it('should scroll to the appropriate location', () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    const scrollSpy = jest.spyOn(scrollFn, 'scrolltoRef');
    window.matchMedia = createMatchMedia(400);
    const { queryByTitle } = render(<TestComponent />);

    fireEvent.click(queryByTitle('odyssey'));
    expect(scrollSpy).toHaveBeenCalledTimes(1);
    fireEvent.click(queryByTitle('guides'));
    expect(scrollSpy).toHaveBeenCalledTimes(2);
    fireEvent.click(queryByTitle('tools'));
    expect(scrollSpy).toHaveBeenCalledTimes(3);
    fireEvent.click(queryByTitle('docs'));
    expect(scrollSpy).toHaveBeenCalledTimes(4);
  });
});
