import { TextField } from '@mui/material';
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
      maxRows={10}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
