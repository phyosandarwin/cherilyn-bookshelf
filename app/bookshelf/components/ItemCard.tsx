'use client';
import Image from 'next/image';
import type { Item } from '../types';

interface Props {
    item: Item;
    onClick: () => void;
}

export default function ItemCard({ item, onClick }: Props) {
    return (
        <div 
            className="item-card" 
            onClick={onClick}
            style={{
                width: `${item.width}px`,
                height: `${item.height}px`
            }}
        >
            <Image 
                src={item.image} 
                alt={item.title}
                className="item-image"
                width={item.width}
                height={item.height}
                priority={item.shelf === 1}
                sizes="(max-width: 480px) 85px, (max-width: 768px) 90px, 110px"
            />
        </div>
    );
}