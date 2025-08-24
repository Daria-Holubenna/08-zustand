import { NoteTag } from '../api';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

const initialDraft: NoteTag = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraftStore = {
  draft: NoteTag;
  setDraft: (note: NoteTag) => void;
  clearDraft: () => void;
};

export const useDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: (note: NoteTag) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: store => ({
        draft: store.draft,
      }),
    },
  ),
);
