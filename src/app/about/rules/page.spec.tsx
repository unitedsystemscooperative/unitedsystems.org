import { cleanup, render } from '@testing-library/react';
import RulesPage from './page';

describe('about page', () => {
  afterEach(cleanup);

  test('should render', () => {
    const result = render(<RulesPage />);

    expect(result).toBeTruthy();
  });
});
