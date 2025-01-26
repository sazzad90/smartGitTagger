import { atom } from 'recoil';

export const existingTopicsAtom = atom({
  key: 'existingTopicsAtom', // A unique key for this atom
  default: [], // Default value for the state
});
export const generatedTopicsAtom = atom({
  key: "generatedTopicsAtom",
  default: [], // Initial value for generatedTopics
});