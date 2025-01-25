import { atom } from 'recoil';

export const existingTopicsAtom = atom({
  key: 'existingTopicsAtom', // A unique key for this atom
  default: [], // Default value for the state
});
