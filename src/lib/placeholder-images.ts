import data from '@/app/lib/placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Ensure we always return an array, even if the JSON import is unexpected
export const PlaceHolderImages: ImagePlaceholder[] = Array.isArray(data.placeholderImages) 
  ? data.placeholderImages 
  : [];
