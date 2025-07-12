import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { Collection, Product } from '../models/collection.model';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  // --- Development Helper ---
  // Set this to true to simulate an API error for testing the UI.
  private shouldSimulateError = false;
  // In a real application, this data would be fetched from a backend API.
  // For now, we are mocking it here to act as a single source of truth.
  private collections: Collection[] = [
    { id: 'engagement', name: 'Engagement Rings', description: 'Begin your forever with a symbol of love.', imageUrl: 'assets/collection-engagement.jpg', isFeatured: true },
    { id: 'necklaces', name: 'Necklaces', description: 'Adorn your neckline with our stunning designs.', imageUrl: 'assets/collection-necklaces.jpg', isFeatured: true },
    { id: 'earrings', name: 'Earrings', description: 'From classic studs to dazzling drops.', imageUrl: 'assets/collection-earrings.jpg', isFeatured: true },
    { id: 'bracelets', name: 'Bracelets', description: 'Grace your wrist with timeless elegance.', imageUrl: 'assets/images/bracelet-1.jpg', isFeatured: false }
  ];

  private products: Product[] = [
    {
      id: 1, name: 'The Solitaire Dream', category: 'Rings', collectionId: 'engagement', imageUrl: 'assets/ring-1.jpg', additionalImages: ['assets/ring-1.jpg', 'assets/ring-1-side.jpg', 'assets/ring-1-box.jpg'], description: 'A timeless diamond solitaire ring.', price: 2500, originalPrice: 2800, isFeatured: true,
      reviews: [
        { author: 'Priya S.', rating: 5, date: '2023-10-15T08:00:00Z', comment: 'Absolutely stunning! The diamond has so much sparkle. I get compliments on it all the time.', isVerified: true },
        { author: 'Rohan M.', rating: 4, date: '2023-09-20T12:30:00Z', comment: 'Beautiful ring and great customer service. The band is a little thinner than I expected, but still lovely.', isVerified: true },
        { author: 'Anonymous', rating: 5, date: '2023-08-01T18:45:00Z', comment: 'She said yes! Thank you for helping me find the perfect ring.' },
      ]
    },
    {
      id: 2, name: 'Emerald Pendant', category: 'Necklaces', collectionId: 'necklaces', imageUrl: 'assets/images/necklace-1.jpg', additionalImages: ['assets/images/necklace-1.jpg', 'assets/images/necklace-1-model.jpg'], description: 'Featuring a stunning pear-shaped emerald.', price: 3200, originalPrice: 3500, isFeatured: true,
      reviews: [
        { author: 'Anjali K.', rating: 5, date: '2023-11-02T14:00:00Z', comment: 'The emerald has such a deep, beautiful color. It was the perfect anniversary gift.', isVerified: true },
        { author: 'Vikram P.', rating: 5, date: '2023-10-25T10:10:00Z', comment: 'Excellent quality and craftsmanship. It looks even better in person.', isVerified: true },
      ]
    },
    { id: 3, name: 'Pearl Drop Earrings', category: 'Earrings', collectionId: 'earrings', imageUrl: 'assets/images/earrings-1.jpg', additionalImages: ['assets/images/earrings-1.jpg', 'assets/images/earrings-1-detail.jpg'], description: 'Classic elegance with freshwater pearls.', price: 850, tags: ['rakhi'] },
    { id: 4, name: 'Sapphire Eternity Band', category: 'Rings', collectionId: 'engagement', imageUrl: 'assets/images/ring-2.jpg', additionalImages: ['assets/images/ring-2.jpg', 'assets/images/ring-2-hand.jpg'], description: 'A circle of deep blue sapphires.', price: 1800, isFeatured: true },
    { id: 5, name: 'Gold Link Bracelet', category: 'Bracelets', collectionId: 'bracelets', imageUrl: 'assets/images/bracelet-1.jpg', additionalImages: ['assets/images/bracelet-1.jpg', 'assets/images/bracelet-1-clasp.jpg'], description: 'A bold and modern statement piece.', price: 1500, tags: ['new', 'rakhi'] },
    { id: 6, name: 'Diamond Studs', category: 'Earrings', collectionId: 'earrings', imageUrl: 'assets/images/earrings-2.jpg', additionalImages: ['assets/images/earrings-2.jpg', 'assets/images/earrings-2-pair.jpg'], description: 'Essential for every jewelry collection.', price: 1200, tags: ['new'] },
    {
      id: 7, name: 'Ruby Heart Necklace', category: 'Necklaces', collectionId: 'necklaces', imageUrl: 'assets/images/necklace-2.jpg', additionalImages: ['assets/images/necklace-2.jpg', 'assets/images/necklace-2-detail.jpg'], description: 'A passionate and romantic design.', price: 2800, originalPrice: 3150,
      reviews: [
        { author: 'Sonia B.', rating: 5, date: '2023-07-19T09:20:00Z', comment: 'My husband bought this for me and it is my favorite piece of jewelry. The ruby is so vibrant!', isVerified: true },
      ]
    },
    { id: 8, name: 'The Royal Engagement', category: 'Rings', collectionId: 'engagement', imageUrl: 'assets/images/ring-3.jpg', additionalImages: ['assets/images/ring-3.jpg', 'assets/images/ring-3-angle.jpg'], description: 'Inspired by iconic royal jewelry.', price: 4500, isFeatured: true },
    {
      id: 9,
      name: 'Silver Rakhi Bracelet',
      category: 'Bracelets',
      collectionId: 'bracelets',
      imageUrl: 'assets/images/bracelet-1.jpg', // Placeholder image
      additionalImages: ['assets/images/bracelet-1.jpg'],
      description: 'A beautiful silver bracelet, a perfect gift for Raksha Bandhan.',
      price: 1800,
      tags: ['new', 'rakhi']
    }
  ];

  /** Returns only the collections marked as featured for the home page. */
  getFeaturedCollections(): Observable<Collection[]> {
    if (this.shouldSimulateError) {
      return throwError(() => new Error('Could not fetch featured collections.')).pipe(delay(1000));
    }
    return of(this.collections.filter(c => c.isFeatured)).pipe(delay(1000));
  }

  /** Returns only the products marked as featured for the home page. */
  getFeaturedProducts(): Observable<Product[]> {
    if (this.shouldSimulateError) {
      return throwError(() => new Error('Could not fetch featured products.')).pipe(delay(1000));
    }
    return of(this.products.filter(p => p.isFeatured).slice(0, 4)).pipe(delay(1000)); // Limit to 4
  }

  /** Returns products that have a specific tag. */
  getProductsByTag(tag: string, limit?: number): Observable<Product[]> {
    if (this.shouldSimulateError) {
      return throwError(() => new Error(`Could not fetch products for tag: ${tag}`)).pipe(delay(1000));
    }
    let taggedProducts = this.products.filter(p => p.tags?.includes(tag));
    if (limit) {
      taggedProducts = taggedProducts.slice(0, limit);
    }
    return of(taggedProducts).pipe(delay(800));
  }

  /**
   * Returns a random, session-cached list of collections to feature.
   * This provides a dynamic feel without changing on every page load.
   */
  getDynamicFeaturedCollections(): Observable<Collection[]> {
    // This will emit a new shuffled array every 2 seconds, starting immediately.
    return timer(0, 2000).pipe(
      map(() => {
        const allCollections = [...this.collections];
        // Shuffle the array and take the first 3 items
        return this._shuffleArray(allCollections).slice(0, 3);
      })
    );
  }

  /** Returns a single collection by its ID. Useful for a collection details page. */
  getCollectionById(id: string): Observable<Collection | undefined> {
    if (this.shouldSimulateError) {
      return throwError(() => new Error('Could not fetch collection details.')).pipe(delay(1000));
    }
    return of(this.collections.find(c => c.id === id)).pipe(delay(500));
  }

  /** Returns all products for the main collection page. */
  getAllProducts(): Observable<Product[]> {
    if (this.shouldSimulateError) {
      return throwError(() => new Error('Could not fetch products.')).pipe(delay(1000));
    }
    return of(this.products).pipe(delay(1000));
  }

  /** Returns a single product by its ID. */
  getProductById(id: number): Observable<Product | undefined> {
    if (this.shouldSimulateError) {
      return throwError(() => new Error('Could not fetch product details.')).pipe(delay(1000));
    }
    return of(this.products.find(p => p.id === id)).pipe(delay(500));
  }

  /** Returns a list of related products based on category, excluding the current product. */
  getRelatedProducts(productId: number, category: string): Observable<Product[]> {
    if (this.shouldSimulateError) {
      return throwError(() => new Error('Could not fetch related products.')).pipe(delay(1000));
    }
    const related = this.products
      .filter(p => p.category === category && p.id !== productId)
      .slice(0, 4); // Limit to 4 related products
    return of(related).pipe(delay(500));
  }

  /** Returns all unique product categories for building the filter UI. */
  getCategories(): Observable<string[]> {
    if (this.shouldSimulateError) {
      return throwError(() => new Error('Could not fetch categories.')).pipe(delay(1000));
    }
    const uniqueCategories = new Set(this.products.map(p => p.category));
    return of(['All', ...Array.from(uniqueCategories)]).pipe(delay(1000));
  }

  /** Shuffles an array in place and returns it. */
  private _shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
    }
    return array;
  }
}