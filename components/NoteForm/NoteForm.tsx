'use client';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import toast from 'react-hot-toast';
import { NoteTag } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useDraftStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useDraftStore();
  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NoteTag;
    mutate(values);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (newNoteData: NoteTag) => createNote(newNoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/All');
    },
    onError: error => {
      console.error('Ошибка создания заметки:', error);
      toast.error('An error occurred while creating. Plaese, try again!');
    },
  });
  const handleChange = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setDraft({
      ...draft,
      [ev.target.name]: ev.target.value,
    });
  };
  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          defaultValue={draft?.content}
          onChange={handleChange}
          className={css.textarea}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? (
            <>
              <p>
              Creating...
              </p>
            </>
          ) : (
            'Create Note'
          )}
        </button>
      </div>
    </form>
  );
}
