import { render } from '@testing-library/react';
import { USCRules } from '~/about/components/rules';

describe('USC Rules', () => {
  it('should render', () => {
    const { getByText } = render(<USCRules />);

    expect(getByText('Discord')).toBeTruthy();
  });
});
