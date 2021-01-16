import { cleanup, render } from '@testing-library/react';
import { BuildDetailMobile } from 'components/builds/builds/buildDetailMobile';
import { testBuildNoExtra } from 'data/builds/testBuilds/testBuild';
import { getShipInfofromID } from 'functions/builds';
import { MemoryRouter } from 'components/builds/builds/node_modules/react-router-dom';

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
