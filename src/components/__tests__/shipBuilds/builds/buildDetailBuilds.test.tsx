import { cleanup, render } from '@testing-library/react';
import { BuildDetailBuilds } from 'components/shipBuilds/builds/buildDetailBuilds';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as shipHooks from 'hooks/shipBuilds/useShipBuilds';
import { testBuildNoExtra } from 'data/shipBuilds/testBuilds/testBuild';

describe('BuildDetailBuilds', () => {
  afterEach(cleanup);

  it('renders when loading', () => {
    const spy = jest.spyOn(shipHooks, 'useShipBuilds');
    spy.mockReturnValue({
      loading: true,
      shipBuilds: [],
      addBuild: jest.fn(),
      addRelated: jest.fn(),
      addVariant: jest.fn(),
      replaceBuild: jest.fn(),
    });
    const { getByText } = render(
      <MemoryRouter>
        <BuildDetailBuilds title="title" buildIDs={[]} />
      </MemoryRouter>
    );
    expect(getByText('Loading')).toBeDefined();
  });

  it('renders when loading', () => {
    const spy = jest.spyOn(shipHooks, 'useShipBuilds');
    spy.mockReturnValue({
      loading: false,
      shipBuilds: [testBuildNoExtra],
      addBuild: jest.fn(),
      addRelated: jest.fn(),
      addVariant: jest.fn(),
      replaceBuild: jest.fn(),
    });
    const { getByText } = render(
      <MemoryRouter>
        <BuildDetailBuilds title="title" buildIDs={['1234']} />
      </MemoryRouter>
    );
    expect(getByText('title')).toBeDefined();
  });
});
