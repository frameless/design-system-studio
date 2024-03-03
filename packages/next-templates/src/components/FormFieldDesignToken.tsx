import { ForwardedRef, forwardRef } from 'react';
import { FormFieldTextbox, FormFieldTextboxProps } from './FormFieldTextbox';
import { Code, ColorSample } from '@utrecht/component-library-react';
import { useTokenDataContext } from '@/utils/TokenDataContext';
import { useCustomTokenContext } from '@/utils/CustomTokenContext';
import { CursorSample } from './CursorSample';

export interface FormFieldDesignTokenProps extends FormFieldTextboxProps {
  token: string;
  transformValue?: (value: string) => string;
}

export const FormFieldDesignToken = forwardRef(
  ({ token, transformValue, type, ...props }: FormFieldDesignTokenProps, ref: ForwardedRef<HTMLInputElement>) => {
    let color;
    const { getToken } = useTokenDataContext();
    const { formatComputedValue, formatTokenValue, useTokenInput } = useCustomTokenContext();

    const tokenObj = getToken(token);
    const isCursor = !!tokenObj?.isCursor;

    return (
      <FormFieldTextbox type={type} {...props} {...useTokenInput({ token, transformValue })} ref={ref}>
        {getToken(token)?.isColor && <ColorSample color={formatComputedValue(token)}></ColorSample>}
        {type === 'range' && (
          <div>
            <Code>{formatTokenValue(token) || ''}</Code>
          </div>
        )}
        {isCursor && <CursorSample cursor={tokenObj?.value} />}
      </FormFieldTextbox>
    );
  },
);

FormFieldDesignToken.displayName = 'FormFieldDesignToken';
