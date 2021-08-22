import { FormControlLabel, Checkbox } from '@material-ui/core';
import { ChangeEvent } from 'react';

interface IBuildCheckBoxProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  disabled?: boolean;
}
export const BuildCheckBox = (props: IBuildCheckBoxProps) => {
  const { label, id, checked, onChange, disabled } = props;
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      }
    />
  );
};
