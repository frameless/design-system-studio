import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { createStrictContext } from './createStrictContext';

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
