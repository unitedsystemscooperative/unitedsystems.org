import { render, cleanup } from '@testing-library/react';
import SystemsPage from './page';
import * as api from '#/systems/systems-api-utils';
import systemsJson from '../_data/systems.json';

jest.mock('#/systems/systems-api-utils');

describe('Systems page', () => {
  afterEach(cleanup);

  test('should render', async () => {
    const spy = jest.spyOn(api, 'getSystems').mockResolvedValue(systemsJson);
    const page = await SystemsPage();
    const { getByText } = render(page);

    expect(getByText('Gilgamesh Corps')).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
