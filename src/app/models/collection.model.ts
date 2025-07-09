export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  collectionId?: string;
  imageUrl: string;
  description: string;
  price: number;
}