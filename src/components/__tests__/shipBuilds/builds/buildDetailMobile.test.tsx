import { cleanup, render } from '@testing-library/react';
import { BuildDetailMobile } from 'components/shipBuilds/builds/buildDetailMobile';
import { testBuildNoExtra } from 'data/shipBuilds/testBuilds/testBuild';
import { getShipInfofromID } from 'functions/shipBuilds';
import { MemoryRouter } from 'react-router-dom';

describe('BuildDetailMobile', () => {
  afterEach(cleanup);

  it('should display a build', () => {
    render(
      <MemoryRouter>
        <BuildDetailMobile foundBuild={testBuildNoExtra} shipInfo={undefined} />
      </MemoryRouter>
    );
  });

  it('should display a build and shipInfo', () => {
    const shipInfo = getShipInfofromID(testBuildNoExtra.shipId);

    render(
      <MemoryRouter>
        <BuildDetailMobile foundBuild={testBuildNoExtra} shipInfo={shipInfo} />
      </MemoryRouter>
    );
  });
});
