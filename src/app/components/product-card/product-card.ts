import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/collection.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  private cartService = inject(CartService);

  isAdded = false;

  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.isAdded = true;

    // Reset the button state after 2 seconds for user feedback
    setTimeout(() => {
      this.isAdded = false;
    }, 2000);
  }

  messageOnWhatsApp(): void {
    // IMPORTANT: Replace with your business WhatsApp number,
    // including country code without '+' or '00'.
    const phoneNumber = '911234567890';

    const message = `Hello, I'm interested in the product: ${this.product.name} (ID: ${this.product.id}). Could you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }
}
