'use client';

import css from './Notes.module.css';
// import Modal from '../../../../components/Modal/Modal';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import { useState, useEffect } from 'react';
import NoteList from '../../../../components/NoteList/NoteList';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
// import NoteForm from '../../../../components/NoteForm/NoteForm';
import { useDebounce } from 'use-debounce';
import Pagination from '../../../../components/Pagination/Pagination';
import { Toaster } from 'react-hot-toast';
import Loading from '../../../loading';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Link from 'next/link';

interface DataProps {
  tag?: string | undefined;
}

export default function NotesClient({ tag }: DataProps) {
  const itemsPerPage = 12;

  const [search, setSearch] = useState('');
  // const [showModal, setShowModal] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);

  // const openModalWindow = () => setShowModal(true);
  // const closeModalWindow = () => {
  //   setShowModal(false);
  //   setCurrentPage(1);
  // };
  
  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', debouncedSearch, currentPage, itemsPerPage, tag],
    queryFn: () =>
      fetchNotes(
        debouncedSearch,
        currentPage,
        itemsPerPage,
        tag === 'All' ? undefined : tag
      ),
    placeholderData: keepPreviousData,
  });

  const handlePageClick = (selectedItem: { selected: number } | number) => {
    if (typeof selectedItem === 'number') {
        setCurrentPage(selectedItem + 1);
    } else {
        setCurrentPage(selectedItem.selected + 1);
    }
  };

  const handleInputChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const notesToDisplay = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleInputChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageClick}
            currentPage={currentPage - 1}
          />
        )}

         <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
        
        {/* {showModal && (
          <Modal close={closeModalWindow}>
            <NoteForm onCancel={closeModalWindow} />
          </Modal>
        )} */}
      </header>
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      {isSuccess &&
        (notesToDisplay.length > 0 ? (
          <NoteList notes={notesToDisplay} />
        ) : (
          <p>No notes found. Create your first note!</p>
        ))}
    </div>
  );
}
