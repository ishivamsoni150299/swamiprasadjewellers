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
    { id: 1, name: 'The Solitaire Dream', category: 'Rings', collectionId: 'engagement', imageUrl: 'assets/ring-1.jpg', description: 'A timeless diamond solitaire ring.', price: 2500 },
    { id: 2, name: 'Emerald Pendant', category: 'Necklaces', collectionId: 'necklaces', imageUrl: 'assets/images/necklace-1.jpg', description: 'Featuring a stunning pear-shaped emerald.', price: 3200 },
    { id: 3, name: 'Pearl Drop Earrings', category: 'Earrings', collectionId: 'earrings', imageUrl: 'assets/images/earrings-1.jpg', description: 'Classic elegance with freshwater pearls.', price: 850 },
    { id: 4, name: 'Sapphire Eternity Band', category: 'Rings', collectionId: 'engagement', imageUrl: 'assets/images/ring-2.jpg', description: 'A circle of deep blue sapphires.', price: 1800 },
    { id: 5, name: 'Gold Link Bracelet', category: 'Bracelets', collectionId: 'bracelets', imageUrl: 'assets/images/bracelet-1.jpg', description: 'A bold and modern statement piece.', price: 1500 },
    { id: 6, name: 'Diamond Studs', category: 'Earrings', collectionId: 'earrings', imageUrl: 'assets/images/earrings-2.jpg', description: 'Essential for every jewelry collection.', price: 1200 },
    { id: 7, name: 'Ruby Heart Necklace', category: 'Necklaces', collectionId: 'necklaces', imageUrl: 'assets/images/necklace-2.jpg', description: 'A passionate and romantic design.', price: 2800 },
    { id: 8, name: 'The Royal Engagement', category: 'Rings', collectionId: 'engagement', imageUrl: 'assets/images/ring-3.jpg', description: 'Inspired by iconic royal jewelry.', price: 4500 },
  ];

  /** Returns only the collections marked as featured for the home page. */
  getFeaturedCollections(): Observable<Collection[]> {
    if (this.shouldSimulateError) {
      return throwError(() => new Error('Could not fetch featured collections.')).pipe(delay(1000));
    }
    return of(this.collections.filter(c => c.isFeatured)).pipe(delay(1000));
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