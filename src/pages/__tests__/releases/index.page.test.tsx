import { ReleaseInfo } from '@/modules/releases/releaseInfo';
import ReleaseIndexPage, { getStaticProps } from '@/pages/releases/index.page';
import { render } from '@testing-library/react';

describe('Release Index', () => {
  it('should render a list of releases', async () => {
    const result = getStaticProps(null)['props'] as { allReleases: Omit<ReleaseInfo, 'content'>[] };
    const { getByText } = render(<ReleaseIndexPage allReleases={result.allReleases} />);
    expect(getByText('2021-09 Release - 2021-09-27')).toBeInTheDocument();
  });
});
