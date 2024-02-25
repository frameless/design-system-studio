import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { createStrictContext } from './createStrictContext';

type PinnedMap = { [index: string]: boolean };

interface StudioContextProps {
  pinned: PinnedMap;
  setPinned: Dispatch<SetStateAction<{ [index: string]: boolean }>>;
  togglePinned: (token: string) => void;
}

export const [StudioContextProvider, useStudioContext] = createStrictContext<StudioContextProps>({
  name: 'StudioContext',
});

export const initStudioContext = (): StudioContextProps => {
  const [pinned, setPinned] = useState<PinnedMap>({});

  const togglePinned = (name: string) => {
    let newPinned: typeof pinned;
    const isPinned = Object.prototype.hasOwnProperty.call(pinned, name);
    if (isPinned) {
      newPinned = { ...pinned };
      delete newPinned[name];
    } else {
      newPinned = {
        ...pinned,
        [name]: !pinned[name],
      };
    }
    setPinned(newPinned);
  };
  return {
    pinned,
    setPinned,
    togglePinned,
  };
};
