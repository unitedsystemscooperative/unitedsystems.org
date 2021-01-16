import { TextField } from '@material-ui/core';
import { ChangeEvent } from 'react';

interface IBuildAddText {
  id: string;
  label: string;
  isMultiline: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

/**
 *
 */
export const BuildAddText = (props: IBuildAddText) => {
  const { id, label, value, onChange, isMultiline, disabled } = props;
  return (
    <TextField
      variant="outlined"
      id={id}
      label={label}
      multiline={isMultiline}
      rowsMax={10}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
