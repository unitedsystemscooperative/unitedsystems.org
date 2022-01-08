import { ReleaseInfo } from '@/modules/releases/releaseInfo';
import Release, { getStaticPaths, getStaticProps } from '@/pages/releases/[id].page';
import { render } from '@testing-library/react';

describe('Release Pages', () => {
  it('should generate a list of release ids for routing', () => {
    const releaseIds = ['2020-12', '2021-01', '2021-08-1', '2021-08', '2021-09'];
    const result = getStaticPaths(null);
    expect(result).toEqual({
      paths: releaseIds.map((x) => ({ params: { id: x } })),
      fallback: false,
    });
  });

  it('should render a release', () => {
    const result = getStaticProps({ params: { id: '2021-01' } })['props'] as {
      releaseData: ReleaseInfo;
    };
    const { getByText, queryByText } = render(<Release releaseData={result.releaseData} />);
    expect(getByText('2021-01 Release')).toBeInTheDocument();
    expect(queryByText('2020-12 Release')).toBeFalsy();
    expect(getByText('2021-01-23')).toBeInTheDocument();
  });
});
