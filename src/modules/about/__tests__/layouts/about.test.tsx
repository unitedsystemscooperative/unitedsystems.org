import { render } from '@testing-library/react';
import { AboutLayout } from '~/about/layouts/about';

describe('About Layout', () => {
  it('should render', () => {
    const { getByText } = render(
      <AboutLayout>
        <div>child</div>
      </AboutLayout>
    );

    expect(getByText('child')).toBeTruthy();
    expect(getByText('Our Allies')).toBeTruthy();
  });
});
