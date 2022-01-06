import mediaQuery from 'css-mediaquery';

export const createMatchMedia = (width) => {
  return (query): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    addListener: jest.fn(),
    addEventListener: jest.fn(),
    removeListener: jest.fn(),
    removeEventListener: jest.fn(),
    media: '',
    onchange: jest.fn(),
    dispatchEvent: (_event) => true,
  });
};
