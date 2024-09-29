import { render, cleanup } from '@testing-library/react';
import AlliesPage from './page';
import * as api from '#/allies/allies-api-utils';
import alliesJson from '../_data/allies.json';

jest.mock('#/allies/allies-api-utils');

describe('Allies page', () => {
  afterEach(cleanup);

  test('should render', async () => {
    const spy = jest.spyOn(api, 'getAllies').mockResolvedValue(alliesJson);
    const page = await AlliesPage();
    const { getByText } = render(page);

    expect(getByText('Gilgamesh Corps')).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
