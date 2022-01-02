import { server } from '@/__mocks__/server/server';
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { AboutAllies } from '~/about/components/allies';
import { allies } from '~/about/data/allies';

describe('Allies Component', () => {
  it('should render with loading', () => {
    const { queryByTestId } = render(<AboutAllies init={null} />);

    expect(queryByTestId('allies-list')).toBeNull();
  });

  it('should render with data', async () => {
    server.use(rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json(allies))));

    const { queryByTestId, getByText } = render(<AboutAllies init={null} />);

    await waitFor(() => {
      expect(queryByTestId('allies-list')).toBeTruthy();
      expect(getByText('ROOKS')).toBeTruthy();
    });
  });
});
