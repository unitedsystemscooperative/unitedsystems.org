import { render } from '@testing-library/react';
import { AdminDashboard } from '../../components/adminDashboard';

describe('Admin Dashboard', () => {
  it('should render', () => {
    const component = render(<AdminDashboard />);

    expect(component).toBeTruthy();
  });
});
