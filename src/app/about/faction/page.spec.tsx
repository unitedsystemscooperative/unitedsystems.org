import { render, cleanup } from '@testing-library/react';
import SystemsPage from './page';
import * as api from '#/systems/systems-api-utils';
import systemsJson from '../_data/systems.json';

jest.mock<typeof api>('#/systems/systems-api-utils', () => ({
  getSystems: jest.fn(),
  COLLECTION: 'systems',
}));

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
