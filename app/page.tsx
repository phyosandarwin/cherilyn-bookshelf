'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const SECRET_CODE = '2016'; 

export default function Home() {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playHoverSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputCode === SECRET_CODE) {
      sessionStorage.setItem('isAuthenticated', 'true');
      router.push('/bookshelf');
    } else {
      setError('Wrong passcode!');
      setInputCode(''); 
    }
  };

  return (
    <main className={styles.landingPage}>
      <div className={styles.dialogBox}>
        <h1 className={styles.title}>Thank you for checking in!</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.inputLabel}>ENTER PASSCODE</label>
            <input
              type="password" 
              maxLength={4}
              value={inputCode}
              onChange={(e) => {
                setError(''); 
                setInputCode(e.target.value);
              }}
              className={styles.passcodeInput}
              autoFocus
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitBtn}
            onMouseEnter={playHoverSound}
          >
            Unlock Gallery
            <audio ref={audioRef} src="/audio/hover_item.mp3" />
          </button>
          
          <div className={styles.errorMessage}>{error}</div>
          <p className={styles.hintText}>
            Hint: year we first met
          </p>
        </form>
      </div>
    </main>
  );
}