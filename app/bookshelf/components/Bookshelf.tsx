'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ItemCard from './ItemCard';
import ScrapbookModal from './ScrapbookModal';
import { items } from '../data/items';
import type { Item } from '../types';
import styles from '../page.bookshelf.module.css';
import Image from 'next/image';

export default function Bookshelf() {
    const router = useRouter();
    const [selected, setSelected] = useState<Item | null>(null);
    const [isLightsOn, setIsLightsOn] = useState(true); // default to lights on
    const [isMusicPlaying, setIsMusicPlaying] = useState(true); // default to music playing

    const switchAudioRef = useRef<HTMLAudioElement | null>(null); // for hover or click sounds
    const bgMusicRef = useRef<HTMLAudioElement | null>(null); // for background music

    // Initial setup: Set background music volume lower so SFX pop out
    useEffect(() => {
        if (bgMusicRef.current) {
            bgMusicRef.current.volume = 0.3; // 30% volume for cozy background
        }
        // switchAudioRef stays at default 1.0 (100%) volume
    }, []);

    const toggleLights = () => {
        setIsLightsOn(prev => !prev);
        if (switchAudioRef.current) {
            switchAudioRef.current.currentTime = 0;
            switchAudioRef.current.play().catch(() => {});
        }
    };

    const toggleMusic = () => {
        if (bgMusicRef.current) {
            if (isMusicPlaying) {
                bgMusicRef.current.pause();
            } else {
                // Play background music (Background audio)
                bgMusicRef.current.play().catch(e => console.log("Playback failed", e));
            }
            setIsMusicPlaying(!isMusicPlaying);
            
            // Play button click sound (Foreground audio)
            // This runs independently of the music track
            if (switchAudioRef.current) {
                switchAudioRef.current.currentTime = 0;
                switchAudioRef.current.play().catch(() => {});
            }
        }
    };

    const handleHomeClick = () => {
        sessionStorage.removeItem('isAuthenticated');
        if (switchAudioRef.current) {
            switchAudioRef.current.currentTime = 0;
            switchAudioRef.current.play().catch(() => {});
        }
        router.push('/');
    };

    const shelf1Items = items.filter(item => item.shelf === 1);
    const shelf2Items = items.filter(item => item.shelf === 2);
    const shelf3Items = items.filter(item => item.shelf === 3);

    // Determines the background image URL based on light state
    const bgImage = isLightsOn  
        ? 'url("/images/items/room_shelf.gif")' 
        : 'url("/images/items/room_shelf_night.gif")'; // Make sure this image exists!

    return (
        <div className={styles.bookshelfContainer}>
            {/* Dynamic Background Image - replaces the overlay */}
            <div 
                className={styles.dynamicBackground} 
                style={{ backgroundImage: bgImage }}
            />

            {/* CONTROLS CONTAINER (Top Left) */}
            <div className={styles.controlsContainer}>
                {/* 1. Theme Toggle */}
                <div 
                    className={`${styles.themeToggle} ${isLightsOn ? styles.active : ''}`} 
                    onClick={toggleLights}
                    title={isLightsOn ? "Switch to Dark Mode" : "Switch to Bright Mode"}
                    role="button"
                    aria-label={isLightsOn ? "Switch to dark mode" : "Switch to bright mode"}
                >
                    <div className={styles.toggleHandle}></div>
                </div>
                {/* 2. Music Toggle */}
                <div 
                    className={`${styles.musicToggle} ${isMusicPlaying ? styles.active : ''}`}
                    onClick={toggleMusic}
                    title={isMusicPlaying ? "Pause Music" : "Play Music"}
                    role="button"
                    aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
                >
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
                    >
                        {isMusicPlaying ? (
                            // Playing icon (musical notes)
                            <>
                                <path d="M9 18V5L21 3V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
                            </>
                        ) : (
                            // Paused icon (muted speaker)
                            <>
                                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </>
                        )}
                    </svg>
                </div>
                {/* 3. Home Button */}
                <div 
                    className={styles.homeButton}
                    onClick={handleHomeClick}
                    title="Return to Home"
                    role="button"
                    aria-label="Return to home page"
                >
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
                    >
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* AUDIO ELEMENTS - Separated in DOM */}
            {/* 1. Foreground SFX (Click) */}
            <audio ref={switchAudioRef} src="/audio/click_item.mp3" />
            
            {/* 2. Background Music (Looping) */}
            {/* Ensure you have a file named 'bg_music.mp3' in your public/audio folder */}
            <audio ref={bgMusicRef} src="/audio/bg_music.mp3" loop />

            <div className={styles.bookshelfFrame}>
                <div className={styles.bannerStand}>
                    <div className={styles.bannerSign}>
                        {/* Pixel Plant */}
                        <Image 
                            src="/images/items/plant_pixel.png" 
                            alt="Pixel Plant" 
                            className={styles.pixelPlant}
                            width={100} 
                            height={100}
                        />
                        <h2 className={styles.bannerSignTitle}>Cherilyn-Phyo Friendship memory collection</h2>
                    </div>
                </div>

                <div className={styles.bookshelfBack}></div>
                <div className={styles.bookshelfTop}></div>
                <div className={`${styles.bookshelfSide} ${styles.bookshelfSideLeft}`}></div>
                <div className={`${styles.bookshelfSide} ${styles.bookshelfSideRight}`}></div>
                
                <div className={styles.shelvesContainer}>
                    {/* Shelf 1 */}
                    <div className={styles.shelf}>
                        <div className={styles.shadow}></div>
                        <div className={styles.shelfItems}>
                            {shelf1Items.map((item) => (
                                <ItemCard key={item.id} item={item} onClick={() => setSelected(item)} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Shelf 2 */}
                    <div className={styles.shelf}>
                        <div className={styles.shadow}></div>
                        <div className={styles.shelfItems}>
                            {shelf2Items.map((item) => (
                                <ItemCard key={item.id} item={item} onClick={() => setSelected(item)} />
                            ))}
                        </div>
                    </div>

                    {/* Shelf 3 */}
                    <div className={styles.shelf}>
                        <div className={styles.shadow}></div>
                        <div className={styles.shelfItems}>
                            {shelf3Items.map((item) => (
                                <ItemCard key={item.id} item={item} onClick={() => setSelected(item)} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.bookshelfBottom}></div>
            </div>
            {selected && <ScrapbookModal item={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}