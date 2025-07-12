export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface Review {
  author: string;
  rating: number; // A rating from 1 to 5
  date: string; // Stored as an ISO string e.g., '2023-10-27T10:00:00Z'
  comment: string;
  isVerified?: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  collectionId?: string;
  imageUrl: string; // Primary image for listings and thumbnails
  additionalImages: string[]; // Gallery images for the product detail page
  description: string;
  price: number;
  originalPrice?: number; // Optional: For showing discounts
  reviews?: Review[]; // Optional: An array of customer reviews
  isFeatured?: boolean;
  tags?: string[]; // e.g., ['new', 'rakhi', 'sale']
}