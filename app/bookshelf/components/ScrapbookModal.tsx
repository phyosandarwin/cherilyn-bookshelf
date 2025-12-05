'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Item, GalleryItem } from '../types';
import styles from '../page.modal.module.css';

interface Props {
    item: Item;
    onClose: () => void;
}

export default function ScrapbookModal({ item, onClose }: Props) {
    const closeAudioRef = useRef<HTMLAudioElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClose = () => {
        closeAudioRef.current?.play();
        setTimeout(onClose, 300);
    };

    const handleNext = () => {
        if (item.galleryItems) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % item.galleryItems!.length);
        }
    };

    const handlePrev = () => {
        if (item.galleryItems) {
            setCurrentIndex((prevIndex) =>
                (prevIndex - 1 + item.galleryItems!.length) % item.galleryItems!.length
            );
        }
    };

    const renderGalleryItem = (galleryItem: GalleryItem) => {
        if (galleryItem.type === 'image') {
            return (
                <Image
                    src={galleryItem.src}
                    alt="Gallery Item"
                    width={300}
                    height={300}
                    className={styles.galleryImage}
                />
            );
        } else if (galleryItem.type === 'video') {
            return (
                <video controls className={styles.galleryVideo}>
                    <source src={galleryItem.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        }
        return null;
    };

    const renderGallery = () => {
        if (!item.galleryItems || item.galleryItems.length === 0) {
            return null;
        }

        const showArrows = item.galleryItems.length > 1;

        return (
            <div className={styles.carousel}>
                {showArrows && (
                    <button className={styles.carouselButton} onClick={handlePrev}>
                        ‹
                    </button>
                )}
                <div className={styles.carouselItem}>
                    {renderGalleryItem(item.galleryItems[currentIndex])}
                </div>
                {showArrows && (
                    <button className={styles.carouselButton} onClick={handleNext}>
                        ›
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <audio ref={closeAudioRef} src="/audio/close_item.mp3" />
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button onClick={handleClose} className={styles.closeBtn}>
                    ×
                </button>
                <h2 className={styles.modalTitle}>{item.title}</h2>
                <p className={styles.modalDescription}>{item.description}</p>
                {renderGallery()}
            </div>
        </div>
    );
}
