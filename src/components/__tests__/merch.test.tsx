import { Merch } from '@/components/merch';
import { MerchStore } from '@/data/links';
import { render, RenderResult } from '@testing-library/react';

let component: RenderResult;

describe('Merch Component', () => {
  beforeEach(() => {
    component = render(<Merch />);
  });

  it('should render', () => {
    const { getByText } = component;

    expect(getByText('USC Merch Store')).toBeTruthy();
  });

  it('should use the Merch store link', () => {
    const { getByTestId } = component;

    expect(getByTestId('straight-link')).toHaveAttribute('href', MerchStore);
    expect(getByTestId('img-link')).toHaveAttribute('href', MerchStore);
  });
});
