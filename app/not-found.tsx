import Link from 'next/link';
import css from './Home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Unfortunately, this page does not exist.',
  openGraph: {
    title: 'Page Not Found',
    description: 'Unfortunately, this page does not exist.',
    url: 'https://08-zustand-git-main-daria-hs-projects.vercel.app/404',
    images: [
      {
        url: 'https://static.vecteezy.com/system/resources/previews/010/886/263/non_2x/404-error-page-free-download-free-vector.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Page Not Found 404',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back</Link>
    </>
  );
}
