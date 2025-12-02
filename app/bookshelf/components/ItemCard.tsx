'use client';
import SoundPlayer from './SoundPlayer';
import type { Item } from '../types';
import Image from 'next/image';

interface Props {
item: Item;
onClick: () => void;
}


export default function ItemCard({ item, onClick }: Props) {
const playSound = () => SoundPlayer.playClick();


return (
<div className="item-card" onClick={() => { playSound(); onClick(); }}>
    <Image src={item.image} alt={item.title} className="item-image" width={200} height={200} />
</div>
);
}