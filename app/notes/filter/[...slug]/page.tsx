import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] === 'All' ? undefined : slug?.[0];

  return {
    title: `Notes: ${tag ? `${tag}` : 'All'}`,
    description: `Note: ${tag || 'All'}: Notes in Notehub.`,
    openGraph: {
      title: `Notes: ${tag ? `${tag}` : 'All'}`,
      description: `Note: ${tag || 'All'}: Notes in Notehub.`,
      url: `https://07-routing-nextjs-rosy-iota.vercel.app/notes/filter/${(slug ?? []).join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'notehub image',
        },
      ],
    },
  };
};


export default async function NotesByTags({ params }: Props) {
  const { slug } = await params;

  const initialPage = 1;
  const initialSearch = '';
const perPage = 12;
  const tag = slug?.[0] === 'All' ? undefined : slug?.[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', initialSearch, initialPage, tag],
    queryFn: () => fetchNotes(initialSearch, initialPage, perPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}