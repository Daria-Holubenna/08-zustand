import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default async function NotesSidebar() {
  const tagTypeArr = ['All', 'Todo', 'Work', 'Shopping', 'Personal', 'Meeting'];
  return (
    <div>
      <ul className={css.menuList}>
        {tagTypeArr.map(tag => (
          <li key={tag}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
