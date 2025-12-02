'use client';
import SoundPlayer from './SoundPlayer';
import type { Item } from '../types';
import Image from 'next/image';


interface Props {
  item: Item;
  onClose: () => void;
}


export default function ScrapbookModal({ item, onClose }: Props) {
  return (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={() => { SoundPlayer.playFlip(); onClose(); }}>✕</button>
      <Image src={item.image} alt={item.title} className="modal-image" width={500} height={500} />
      <p>{item.description}</p>
    </div>
  </div>
  );
}