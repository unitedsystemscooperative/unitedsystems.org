import { cleanup, render } from '@testing-library/react';
import { Infographic } from 'components/information';

describe('Infographic', () => {
  afterEach(cleanup);

  it('Renders the Cave Johnson', () => {
    const { getByText } = render(<Infographic img="cave-johnson" />);

    expect(getByText('Cave Johnson')).toBeDefined();
  });

  it(`renders 'Image not Found'`, () => {
    const { getByText } = render(<Infographic img="should-not-be-found" />);

    expect(getByText('Image not found')).toBeDefined();
  });
});
