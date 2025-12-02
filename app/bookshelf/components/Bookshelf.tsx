'use client';
import { useState } from 'react';
import ItemCard from './ItemCard';
import ScrapbookModal from './ScrapbookModal';
import type { Item } from '../types';


const items: Item[] = [
    {
        id: '1',
        title: 'tortorous monday ncc sessions',
        image: '/items/ncc_cap.png',
        description: 'A cute description or scrapbook page.',
    },
    {
        id: '2',
        title: '189 bus-chasing',
        image: '/items/bus_189_3d.png',
        description: 'Another page inside the scrapbook.',
    },
    {
        id: '3',
        title: 'disposable camera',
        image: '/items/disposable_camera.png',
        description: 'Film pictures are still in the making... But here are some places we took:)',
    }
];


export default function Bookshelf() {
const [selected, setSelected] = useState<Item | null>(null);

    return (
        <div className="shelf">
            <div className='shadow'></div>
            {items.map((item) => (
            <ItemCard key={item.id} item={item} onClick={() => setSelected(item)} />
            ))}
            {selected && <ScrapbookModal item={selected} onClose={() => setSelected(null)} />}
        </div>
        
    );
}