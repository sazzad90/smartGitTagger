import { atom } from 'recoil';

export const existingTopicsAtom = atom({
  key: 'existingTopicsAtom', // A unique key for this atom
  default: [], // Default value for the state
});
export const generatedTopicsAtom = atom({
  key: "generatedTopicsAtom",
  default: [], // Initial value for generatedTopics
});
export const selectedTopicsAtom = atom({
  key: "selectedTopicsAtom",
  default: [], // Initial value for generatedTopics
});

export const matchedTopicsAtom = atom({
  key: "matchedTopicsAtom",
  default: [], // Initial value for generatedTopics
});

export const unmatchedTopicsAtom = atom({
  key: "unmatchedTopicsAtom",
  default: [], // Initial value for generatedTopics
});