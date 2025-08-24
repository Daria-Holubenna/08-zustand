import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';
type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const response = await fetchNoteById(id);
  return {
    title: `Note Details: ${response.title}`,
    description: response?.content.slice(0, 30),
    openGraph: {
      title: `Note Details: ${response.title}`,
      description: response?.content.slice(0, 30),
      url: `https://08-zustand-git-main-daria-hs-projects.vercel.app/notes/${response?.id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Note Hub image',
        },
      ],
    },
  };
}
export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
