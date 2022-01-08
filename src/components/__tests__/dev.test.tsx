import { DevComponent } from '@/components/dev';
import { render } from '@testing-library/react';

describe('Dev Component', () => {
  it('should render', () => {
    const { getByText } = render(<DevComponent />);

    expect(getByText('Developer Info')).toBeTruthy();
  });
});
