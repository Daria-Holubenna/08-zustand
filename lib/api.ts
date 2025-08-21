import axios from 'axios';
const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
import type Note from '../types/note';

export interface NoteHttpResp {
  notes: Note[];
  totalPages: number;
}
export interface NoteTag {
  title: string;
  content: string;
  tag: TagType;
}

export type TagType = 'Todo' | 'Work' | 'Shopping' | 'Personal' | 'Meeting';
export const tagTypeArr = [
  'All',
  'Todo',
  'Work',
  'Shopping',
  'Personal',
  'Meeting',
];

export async function fetchNotes(
  search?: string,
  page: number = 1,
  perPage: number = 12,
  tag?: string,
): Promise<NoteHttpResp> {
  const { data } = await axios.get<NoteHttpResp>(
    'https://notehub-public.goit.study/api/notes',
    {
      params: {
        search,
        page,
        perPage,
        ...(tag ? {tag} : {}),
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return data;
}

export const createNote = async (noteData: NoteTag): Promise<Note> => {
  const { data } = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    noteData,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return data;
};

export interface CategoriesHttpResp {
  tags: Tag[];
}
export type Tag = {
  id: string,
  name: string,
  description: string,
  createdAt: string,
  updateAt: string,
}

export const getTag = async (): Promise<CategoriesHttpResp> => {
  const { data } = await axios.get<CategoriesHttpResp>(`https://notehub-public.goit.study/api/tags`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return data;
};
