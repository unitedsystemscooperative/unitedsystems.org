import { cleanup, render } from '@testing-library/react';
import { BuildDetailFull } from 'components/builds/builds/buildDetailFull';
import { testBuildNoExtra } from 'data/builds/testBuilds/testBuild';
import { getShipInfofromID } from 'functions/builds';
import { MemoryRouter } from 'components/builds/builds/node_modules/react-router-dom';

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
