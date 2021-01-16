import { cleanup, render } from '@testing-library/react';
import { BuildDetailFull } from 'components/shipBuilds/builds/buildDetailFull';
import { testBuildNoExtra } from 'data/shipBuilds/testBuilds/testBuild';
import { getShipInfofromID } from 'functions/shipBuilds';
import { MemoryRouter } from 'react-router-dom';

describe('BuildDetailFull', () => {
  afterEach(cleanup);

  it('should display a build', () => {
    render(
      <BuildDetailFull foundBuild={testBuildNoExtra} shipInfo={undefined} />
    );
  });

  it('should display a build and shipInfo', () => {
    const shipInfo = getShipInfofromID(testBuildNoExtra.shipId);

    render(
      <MemoryRouter>
        <BuildDetailFull foundBuild={testBuildNoExtra} shipInfo={shipInfo} />
      </MemoryRouter>
    );
  });
});
