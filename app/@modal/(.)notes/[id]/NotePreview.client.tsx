'use client';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const close = () => router.back();
  const {
    data: note,
    isPending,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: !!id,
  });
  if (isPending) return <Loading />;
  if (error || !note) return <ErrorMessage />;
  return (
    <Modal close={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.backBtn} onClick={close}>
              Back
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}
