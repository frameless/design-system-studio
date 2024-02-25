import { createContext, useContext } from 'react';
import type { Provider } from 'react';

/**
 * Source: https://juliangaramendy.dev/blog/strict-react-context
 */
export function createStrictContext<T>({ errorMessage, name }: { errorMessage?: string; name?: string }) {
  const Context = createContext<T | undefined>(undefined);

  Context.displayName = name;

  function useStrictContext() {
    const context = useContext(Context);
    if (!context) {
      throw new Error(errorMessage || `${name || ''} Context Provider is missing`);
    }
    return context;
  }

  return [Context.Provider, useStrictContext] as [Provider<T>, () => T];
}
