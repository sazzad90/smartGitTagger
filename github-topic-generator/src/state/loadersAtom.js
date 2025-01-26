import { atom } from 'recoil';

  export const existingTopicLoaderAtom = atom({
    key: "existingTopicLoaderAtom",
    default: true, // Initial value for generatedTopicLoader
  });
  
  export const generatedTopicLoaderAtom = atom({
    key: "generatedTopicLoaderAtom",
    default: false, // Initial value for generatedTopicLoader
  });
  
