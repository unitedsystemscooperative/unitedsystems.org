import BGSPage from '@/pages/information/bgs.page';
import { render } from '@testing-library/react';

describe('BGS Page', () => {
  it('should render', () => {
    const component = render(<BGSPage />);
    expect(component).toBeTruthy();
  });
});
