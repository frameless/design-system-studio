import { createStrictContext } from './createStrictContext';
import { DesignToken, DesignTokenInfo, DesignTokenMap, addTokenInfo, createDesignTokenMap } from './design';

export interface TokenDataContext {
  tokens: DesignTokenInfo[];
  tokenMap: DesignTokenMap<DesignTokenInfo>;
  getToken: (tokenName: string) => DesignTokenInfo | undefined;
  tokenExists: (tokenName: string) => boolean;
}

export const [TokenDataContextProvider, useTokenDataContext] = createStrictContext<TokenDataContext>({
  name: 'TokenData',
});

export const initTokenDataContext = ({ tokens }: { tokens: DesignToken[] }): TokenDataContext => {
  const tokenInfo = tokens.map(addTokenInfo);
  const tokenMap = createDesignTokenMap(tokenInfo);
  const tokenExists = (name: string) => Object.prototype.hasOwnProperty.call(tokenMap, name);
  return {
    tokens: tokenInfo,
    tokenMap,
    getToken: (name: string) => (tokenExists(name) ? tokenMap[name] : undefined),
    tokenExists,
  };
};
