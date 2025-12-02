'use client';
import { useState } from 'react';
import ItemCard from './ItemCard';
import ScrapbookModal from './ScrapbookModal';
import { items } from '../data/items';
import type { Item } from '../types';

export default function Bookshelf() {
    const [selected, setSelected] = useState<Item | null>(null);

    // Group items by shelf
    const shelf1Items = items.filter(item => item.shelf === 1);
    const shelf2Items = items.filter(item => item.shelf === 2);
    const shelf3Items = items.filter(item => item.shelf === 3);

    return (
        <div className="bookshelf-container">
            <div className="bookshelf-frame">
                <div className="bookshelf-back"></div>
                <div className="bookshelf-top"></div>
                <div className="bookshelf-side bookshelf-side-left"></div>
                <div className="bookshelf-side bookshelf-side-right"></div>
                
                <div className="shelves-container">
                    {/* Shelf 1 */}
                    <div className="shelf">
                        <div className="shadow"></div>
                        <div className="shelf-items">
                            {shelf1Items.map((item) => (
                                <ItemCard key={item.id} item={item} onClick={() => setSelected(item)} />
                            ))}
                        </div>
                    </div>

                    {/* Shelf 2 */}
                    <div className="shelf">
                        <div className="shadow"></div>
                        <div className="shelf-items">
                            {shelf2Items.map((item) => (
                                <ItemCard key={item.id} item={item} onClick={() => setSelected(item)} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Shelf 3 */}
                    <div className="shelf">
                        <div className="shadow"></div>
                        <div className="shelf-items">
                            {shelf3Items.map((item) => (
                                <ItemCard key={item.id} item={item} onClick={() => setSelected(item)} />
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="bookshelf-bottom"></div>
            </div>
            {selected && <ScrapbookModal item={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}