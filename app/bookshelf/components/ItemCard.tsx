'use client';
import Image from 'next/image';
import type { Item } from '../types';
import { useRef } from 'react';
import styles from '../page.modal.module.css';

interface Props {
    item: Item;
    onClick: () => void;
}

export default function ItemCard({ item, onClick }: Props) {
    const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
    const clickAudioRef = useRef<HTMLAudioElement | null>(null);

    const handleHover = () => {
        hoverAudioRef.current?.play();
    };

    const handleClick = () => {
        clickAudioRef.current?.play();
        onClick();
    };

    return (
        <div
            className={styles.itemCard}
            onMouseEnter={handleHover}
            onClick={handleClick}
            style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
            }}
        >
            <audio ref={hoverAudioRef} src={`/audio/hover_item.mp3`} />
            <audio ref={clickAudioRef} src={`/audio/click_item.mp3`} />
            <Image
                src={item.image}
                alt={item.title}
                className={styles.itemImage}
                fill
                priority={item.shelf === 1}
                sizes="(max-width: 480px) 85px, (max-width: 768px) 90px, 110px"
            />
        </div>
    );
}