// app/bookshelf/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Bookshelf from "./components/Bookshelf";
import styles from "./page.module.css";

export default function Page() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');

    if (auth !== 'true') {
      router.push('/');
    } else {
      setTimeout(() => {
        setIsAuthorized(true);
      }, 0);
    }
  }, [router]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className={styles.bookshelfPage}>
      <Bookshelf />
    </main>
  );
}