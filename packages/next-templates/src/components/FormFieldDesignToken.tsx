import { ForwardedRef, forwardRef } from 'react';
import { FormFieldTextbox, FormFieldTextboxProps } from './FormFieldTextbox';
import { ColorSample } from '@utrecht/component-library-react';

export interface FormFieldDesignTokenProps extends FormFieldTextboxProps {
  token: string;
}

export const FormFieldDesignToken = forwardRef(
  ({ ...props }: FormFieldDesignTokenProps, ref: ForwardedRef<HTMLInputElement>) => {
    let color;
    return (
      <FormFieldTextbox {...props} ref={ref}>
        {color && <ColorSample color={color}></ColorSample>}
      </FormFieldTextbox>
    );
  },
);

FormFieldDesignToken.displayName = 'FormFieldDesignToken';
