import { atom } from 'recoil';

export const isGenerateClickedAtom = atom({
    key: "isGenerateClickedAtom",
    default: false, // Initial value for isGenerateClicked
  });
  
export const isFinishClickedAtom = atom({
    key: "isFinishClickedAtom",
    default: false, // Initial value for isGenerateClicked
});

export const isClipboardClickedAtom = atom({
  key: "isClipboardClickedAtom",
  default: false, // Initial value for isGenerateClicked
});