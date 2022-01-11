import RanksPage from '@/pages/information/ranks.page';
import { render } from '@testing-library/react';

describe('Ranks Page', () => {
  it('should render', () => {
    const component = render(<RanksPage />);
    expect(component).toBeTruthy();
  });
});
