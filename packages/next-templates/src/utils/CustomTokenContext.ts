import { InputHTMLAttributes, useState } from 'react';
import { createStrictContext } from './createStrictContext';
import { DesignTokenMap, DesignTokenValue, DesignTokenValueMap, UseTokenArgs } from './design';

interface TokenInputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'onInput' | 'list'> {
  defaultValue?: string;
  placeholder?: string;
}

export interface CustomTokenContext {
  tokenMap: DesignTokenValueMap;
  getComputedValue: (tokenName: string) => DesignTokenValue | undefined;
  getTokenValue: (tokenName: string) => DesignTokenValue | undefined;
  formatTokenValue: (tokenName: string) => string;
  formatComputedValue: (tokenName: string) => string;
  useTokenInput: (arg: UseTokenArgs) => TokenInputProps;
}

export const [CustomTokenContextProvider, useCustomTokenContext] = createStrictContext<CustomTokenContext>({
  name: 'CustomToken',
});

export const initCustomTokenContext = ({
  tokens,
  tokenMap,
}: {
  tokenMap: DesignTokenMap;
  tokens: DesignTokenValueMap;
}): CustomTokenContext => {
  const [customTokenMap, setCustomTokenMap] = useState({
    ...tokens,
  });

  const getTokenValue = (name: string) =>
    Object.prototype.hasOwnProperty.call(customTokenMap, name) ? customTokenMap[name] : undefined;

  const getComputedValue = (name: string) =>
    Object.prototype.hasOwnProperty.call(customTokenMap, name)
      ? customTokenMap[name]
      : Object.prototype.hasOwnProperty.call(tokenMap, name)
        ? tokenMap[name].value
        : undefined;

  const setTokenValue = (name: string, value: string) =>
    setCustomTokenMap({
      ...customTokenMap,
      [name]: value,
    });

  const format = (value: DesignTokenValue) => (value == undefined ? '' : String(value));
  const formatTokenValue = (name: string): string => format(getTokenValue(name));
  const formatComputedValue = (name: string): string => format(getComputedValue(name));

  const useTokenInput = ({ token, transformValue }: UseTokenArgs): TokenInputProps => {
    const tokenObj = Object.prototype.hasOwnProperty.call(tokenMap, token) ? tokenMap[token] : undefined;
    return {
      // Use the preset value (from query params, or from a saved session, for example)
      // If no preset value exists, then use the value from the base theme.
      defaultValue: formatComputedValue(token),
      onInput: (evt) => {
        const inputElement = evt.target as HTMLInputElement;
        if (inputElement) {
          let value = inputElement.value;
          if (transformValue) {
            value = transformValue(value);
          }
          setTokenValue(token, value);
        }
      },
      list:
        tokenObj && ['color', 'border-color', 'background-color'].includes(tokenObj.path[tokenObj.path.length - 1])
          ? 'color-tokens'
          : tokenObj && tokenObj.path[tokenObj.path.length - 1] == 'font-family'
            ? 'font-family-values'
            : undefined,
    };
  };
  return {
    tokenMap: customTokenMap,
    getTokenValue,
    getComputedValue,
    useTokenInput,
    formatTokenValue,
    formatComputedValue,
  };
};
