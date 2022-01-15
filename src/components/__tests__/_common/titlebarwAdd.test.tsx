import { TitleBarwAdd } from '@/components/_common';
import { fireEvent, render } from '@testing-library/react';

describe('TitleBar with Add Button', () => {
  it('should call add', () => {
    const addItem = jest.fn();
    const { getByTestId } = render(
      <TitleBarwAdd title="This is a title" addTip="tip your waiters" addItem={addItem} />
    );

    fireEvent.click(getByTestId('addbutton'));

    expect(addItem).toHaveBeenCalled();
  });
});
