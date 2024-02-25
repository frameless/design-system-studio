import { createStrictContext } from './createStrictContext';
import { DesignToken, DesignTokenMap, createDesignTokenMap } from './design';

export interface TokenDataContext {
  tokens: DesignToken[];
  tokenMap: DesignTokenMap;
  getToken: (tokenName: string) => DesignToken | undefined;
  tokenExists: (tokenName: string) => boolean;
}

export const [TokenDataContextProvider, useTokenDataContext] = createStrictContext<TokenDataContext>({
  name: 'TokenData',
});

export const initTokenDataContext = ({ tokens }: { tokens: DesignToken[] }): TokenDataContext => {
  const tokenMap = createDesignTokenMap(tokens);
  const tokenExists = (name: string) => Object.prototype.hasOwnProperty.call(tokenMap, name);
  return {
    tokens: [...tokens],
    tokenMap,
    getToken: (name: string) => (tokenExists(name) ? tokenMap[name] : undefined),
    tokenExists,
  };
};
