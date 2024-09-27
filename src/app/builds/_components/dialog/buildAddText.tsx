import { TextFieldwM1 } from '@/app/_components/_common';
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
    <TextFieldwM1
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
