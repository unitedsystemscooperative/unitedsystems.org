import { cleanup, render } from '@testing-library/react';
import { EngIcons } from 'components/shipBuilds/builds/engIcons';

describe('Engineering Icons', () => {
  afterEach(cleanup);

  for (let i = 4; i < 10; i++) {
    it(`renders as none when greater than 3. value: ${i}`, () => {
      const { getByText } = render(<EngIcons engLevel={i} />);
      const element = getByText('Engineering Level: None');

      expect(element).toBeDefined();
    });
  }

  for (let i = 0; i > -10; i--) {
    it(`renders as none when less than 1. value: ${i}`, () => {
      const { getByText } = render(<EngIcons engLevel={i} />);
      const element = getByText('Engineering Level: None');

      expect(element).toBeDefined();
    });
  }

  for (let i = 1; i < 4; i++) {
    it(`renders 1-3 engineering icons depending on value. value: ${i}`, () => {
      const { getByText, getAllByAltText } = render(<EngIcons engLevel={i} />);

      const textElement = getByText('Engineering Level:');
      const imgElements = getAllByAltText('Engineering Icon');

      expect(textElement).toBeDefined();
      expect(imgElements.length).toBe(i);
    });
  }
});
