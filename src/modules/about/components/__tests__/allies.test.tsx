import { render } from '@testing-library/react';
import { allies } from '~/about/data/allies';
import * as hook from '~/about/hooks/useAllies';
import { AboutAllies } from '~/about/components/allies';

const useAlliesSpy = jest.spyOn(hook, 'useAllies');

describe('Allies Component', () => {
  it('should render with loading', () => {
    useAlliesSpy.mockImplementation(() => ({
      allies: null,
      loading: true,
      error: null,
      addAlly: jest.fn(),
      updateAlly: jest.fn(),
      deleteAlly: jest.fn(),
    }));

    const { queryByTestId } = render(<AboutAllies init={null} />);

    expect(queryByTestId('allies-list')).toBeNull();
  });

  it('should render with data', () => {
    useAlliesSpy.mockImplementation(() => ({
      allies: allies,
      loading: false,
      error: null,
      addAlly: jest.fn(),
      updateAlly: jest.fn(),
      deleteAlly: jest.fn(),
    }));

    const { queryByTestId, getByText } = render(<AboutAllies init={null} />);

    expect(queryByTestId('allies-list')).toBeTruthy();
    expect(getByText('ROOKS')).toBeTruthy();
  });
});
