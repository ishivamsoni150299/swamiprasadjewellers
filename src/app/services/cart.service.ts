import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/collection.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable for components to subscribe to
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  constructor() {
    // No localStorage, so nothing to load
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }

    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      item.quantity = newQuantity;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([...this.cartItems]);
  }
}
