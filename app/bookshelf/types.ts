export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
}

export interface Item {
  id: string;
  title: string;
  image: string;
  description: string;
  shelf: number;
  width: number;
  height: number;
  galleryItems?: GalleryItem[];
}