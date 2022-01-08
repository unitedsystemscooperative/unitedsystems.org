import { ConfirmDialog } from '@/components/confirmDialog';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';

let componentBody: RenderResult;

describe('Confirm Dialog', () => {
  const defaultProps = {
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  };

  afterEach(cleanup);

  it(`should not show by default`, () => {
    componentBody = render(
      <ConfirmDialog open={false} {...defaultProps}>
        <div>dialogContent</div>
      </ConfirmDialog>
    );
    const dialogContent = componentBody.queryByText('dialogContent');
    expect(dialogContent).toBeNull();
  });

  it('should show when open is set', () => {
    componentBody = render(
      <ConfirmDialog open={true} title="Title" {...defaultProps}>
        <div>dialogContent</div>
      </ConfirmDialog>
    );
    const titleText = componentBody.getByText('Title');
    const dialogContent = componentBody.getByText('dialogContent');
    expect(titleText).toBeTruthy();
    expect(dialogContent).toBeTruthy();
  });

  it('should call onClose if No is clicked', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    const { getByText } = render(
      <ConfirmDialog open={true} onClose={onClose} onConfirm={onConfirm}>
        <div>dialogContent</div>
      </ConfirmDialog>
    );
    expect(getByText('No')).toBeTruthy();

    fireEvent.click(getByText('No'));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('should call onConfirm if Yes is clicked', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    const { getByText } = render(
      <ConfirmDialog open={true} onClose={onClose} onConfirm={onConfirm}>
        <div>dialogContent</div>
      </ConfirmDialog>
    );
    expect(getByText('Yes')).toBeTruthy();

    fireEvent.click(getByText('Yes'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });
});
