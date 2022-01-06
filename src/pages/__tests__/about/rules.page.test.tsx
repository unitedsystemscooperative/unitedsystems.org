import RulesPage from '@/pages/about/rules.page';
import { render } from '@testing-library/react';

describe('Rules Page', () => {
  it('should render', () => {
    const component = render(<RulesPage />);
    expect(component).toBeTruthy();
  });
});
