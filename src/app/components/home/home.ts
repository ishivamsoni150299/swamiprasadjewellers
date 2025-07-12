import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/collection.model';
import { CollectionService } from '../../services/collection.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  animations: []
})
export class Home implements OnInit {
  private collectionService = inject(CollectionService);
  private router = inject(Router);

  featuredProducts$!: Observable<Product[]>;
  rakhiProducts$!: Observable<Product[]>;
  testimonials = [
    {
      quote:
        'The quality and craftsmanship are unparalleled. I found the perfect engagement ring for my fiancée, and she was overjoyed!',
      author: 'Rohan M.',
      location: 'Mumbai',
    },
    {
      quote:
        'A wonderful shopping experience from start to finish. The staff was incredibly helpful, and their collection is breathtaking.',
      author: 'Priya S.',
      location: 'Delhi',
    },
    {
      quote: `I purchased a necklace for my mother's birthday, and it was even more beautiful in person. A true family heirloom.`,
      author: 'Anjali K.',
      location: 'Bengaluru',
    },
  ];

  ngOnInit(): void {
    this.featuredProducts$ = this.collectionService.getFeaturedProducts();
    this.rakhiProducts$ = this.collectionService.getProductsByTag('rakhi', 4); // Fetch up to 4 products
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  trackByProductId(index: number, product: Product): string {
    // Product IDs are numbers, so convert to string for the key
    return `${product.id}`;
  }
}
