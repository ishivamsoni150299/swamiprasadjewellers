import { Component, Input, OnInit, inject } from '@angular/core';
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
export class ProductCard implements OnInit {
  @Input({ required: true }) product!: Product;
  private cartService = inject(CartService);

  isAdded = false;
  displayImageUrl!: string;

  ngOnInit(): void {
    // Initialize with the primary product image
    this.displayImageUrl = this.product.imageUrl;
  }

  onMouseOver(): void {
    // On hover, show the second image if it exists
    if (this.product.additionalImages && this.product.additionalImages.length > 1) {
      this.displayImageUrl = this.product.additionalImages[1];
    }
  }

  onMouseOut(): void {
    // On mouse out, revert to the primary image
    this.displayImageUrl = this.product.imageUrl;
  }
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
    const phoneNumber = '9140210648';

    const message = `Hello 👋,

I'm interested in one of your products and would like more information.

🔹 *Product Name:* ${this.product.name}  
🔹 *Product ID:* ${this.product.id}  
🔹 *Category:* ${this.product.category}  
${this.product.collectionId ? `🔹 *Collection ID:* ${this.product.collectionId}  \n` : ''}🔹 *Description:* ${this.product.description}  
🔹 *Price:* ₹${this.product.price}

📷 *Image Preview:* ${this.product.imageUrl}

Could you please confirm:
- Availability
- Delivery timeline
- Customization options (if any)
- Final price including any applicable charges

Thank you! Looking forward to your response. 😊`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }
}
