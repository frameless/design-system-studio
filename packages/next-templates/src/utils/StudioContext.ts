import { createContext, useContext, useState } from 'react';
import type { Dispatch, Provider, SetStateAction } from 'react';

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

interface StudioContextProps {
  pinned: { [index: string]: boolean };
  setPinned: Dispatch<SetStateAction<{ [index: string]: boolean }>>;
}

export const [StudioContextProvider, useStudioContext] = createStrictContext<StudioContextProps>({
  name: 'StudioContext',
});

export const initStudioContext = (): StudioContextProps => {
  const [pinned, setPinned] = useState({});

  return {
    pinned,
    setPinned,
  };
};
