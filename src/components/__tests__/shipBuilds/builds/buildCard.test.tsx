import { cleanup, render } from '@testing-library/react';
import { BuildCard } from 'components/shipBuilds/builds/buildCard';
import {
  testBuildExtraBuilds,
  testBuildNoExtra,
} from 'data/shipBuilds/testBuilds/testBuild';
import { MemoryRouter } from 'react-router-dom';

describe('BuildCard', () => {
  afterEach(cleanup);

  it('displays nothing when build is not provided', () => {
    const result = render(<BuildCard shipBuild={undefined} />);

    expect(result.container.firstChild).toBeNull();
  });

  it('displays a build card with a build provided', () => {
    const result = render(
      <MemoryRouter>
        <BuildCard shipBuild={testBuildNoExtra} />
      </MemoryRouter>
    );

    expect(result.getByText('clipper')).toBeDefined();
  });

  it('displays a build card with a build provided and related/variant', () => {
    const result = render(
      <MemoryRouter>
        <BuildCard shipBuild={testBuildExtraBuilds} />
      </MemoryRouter>
    );

    expect(result.getByText('Has Variants')).toBeDefined();
    expect(result.getByText('Has Related Builds')).toBeDefined();
  });
});
