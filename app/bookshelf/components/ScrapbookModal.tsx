'use client';
import Image from 'next/image';
import type { Item } from '../types';

interface Props {
    item: Item;
    onClose: () => void;
}

export default function ScrapbookModal({ item, onClose }: Props) {
    const getModalContent = (item: Item) => {
        switch (item.id) {
            case '1':
                return {
                    bgColor: '#f0f8ff',
                    textColor: '#2c5530',
                    extraContent: '🎖️ Leadership • Discipline • Teamwork'
                };
            case '2':
                return {
                    bgColor: '#fff5f5',
                    textColor: '#8b0000',
                    extraContent: '🥋 Black Belt Journey • Respect • Perseverance'
                };
            case '3':
                return {
                    bgColor: '#f0fff0',
                    textColor: '#006400',
                    extraContent: '🚌 Daily Adventures • Urban Navigation'
                };
            case '4':
                return {
                    bgColor: '#f5f5dc',
                    textColor: '#4b0082',
                    extraContent: '🧪 H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O'
                };
            case '5':
                return {
                    bgColor: '#f0f8ff',
                    textColor: '#1e3a8a',
                    extraContent: '💻 console.log("Hello, World!") • First Steps'
                };
            case '6':
                return {
                    bgColor: '#fdf2f8',
                    textColor: '#701a75',
                    extraContent: '📸 35mm Memories • Analog Soul'
                };
            case '7':
                return {
                    bgColor: '#f0fdf4',
                    textColor: '#15803d',
                    extraContent: '🦅 Bird Watching • Nature Exploration'
                };
            case '8':
                return {
                    bgColor: '#fffbeb',
                    textColor: '#d97706',
                    extraContent: '📷 27 Exposures • Each Shot Counts'
                };
            case '9':
                return {
                    bgColor: '#fff7ed',
                    textColor: '#c2410c',
                    extraContent: '🍿 Movie Nights • Friendship • Laughter'
                };
            case '10':
                return {
                    bgColor: '#fef2f2',
                    textColor: '#dc2626',
                    extraContent: '🎁 Surprise Inside • Worth the Wait'
                };
            default:
                return {
                    bgColor: '#ffffff',
                    textColor: '#000000',
                    extraContent: ''
                };
        }
    };

    const { bgColor, textColor, extraContent } = getModalContent(item);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal" 
                onClick={(e) => e.stopPropagation()}
                style={{ 
                    backgroundColor: bgColor,
                    color: textColor,
                    border: `3px solid ${textColor}20`
                }}
            >
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 style={{ margin: '0 0 15px 0', fontSize: '1.5em' }}>
                    {item.title}
                </h2>
                <Image 
                    src={item.image} 
                    alt={item.title}
                    className="modal-image"
                    width={300}
                    height={300}
                    style={{ 
                        border: `2px solid ${textColor}30`,
                        borderRadius: '8px',
                        objectFit: 'contain'
                    }}
                    sizes="300px"
                />
                <p style={{ 
                    margin: '15px 0',
                    lineHeight: '1.6',
                    fontSize: '1em'
                }}>
                    {item.description}
                </p>
                {extraContent && (
                    <div style={{
                        marginTop: '15px',
                        padding: '10px',
                        backgroundColor: `${textColor}10`,
                        borderRadius: '6px',
                        fontSize: '0.9em',
                        fontStyle: 'italic'
                    }}>
                        {extraContent}
                    </div>
                )}
            </div>
        </div>
    );
}
