import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  private cartService = inject(CartService);

  cartItems$: Observable<CartItem[]> = this.cartService.cart$;
  cartTotal$: Observable<number>;

  constructor() {
    this.cartTotal$ = this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
    );
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(productId, newQuantity);
    } else {
      this.removeFromCart(productId);
    }
  }

  onQuantityChange(event: Event, item: CartItem): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value, 10);
    if (!isNaN(newQuantity)) {
      this.updateQuantity(item.product.id, newQuantity);
    }
  }
}

