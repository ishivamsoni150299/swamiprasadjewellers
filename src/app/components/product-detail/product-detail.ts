import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { Product, Review } from '../../models/collection.model';
import { CollectionService } from '../../services/collection.service';
import { CartService } from '../../services/cart.service';
import { Title } from '@angular/platform-browser';
import { ProductCard } from '../product-card/product-card';
import { StarRating } from '../shared/star-rating/star-rating';
import { ProductReview } from '../shared/product-review/product-review';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard, StarRating, ProductReview],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private collectionService = inject(CollectionService);
  private cartService = inject(CartService);
  private titleService = inject(Title);

  product$!: Observable<Product | undefined>;
  relatedProducts$!: Observable<Product[]>;
  selectedImageUrl: string | undefined;
  isAdded = false;
  isShaking = false;

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.collectionService.getProductById(+id).pipe(
            tap(product => {
              if (product) {
                this.selectedImageUrl = product.imageUrl;
                this.titleService.setTitle(`${product.name} - Swami Prasad Jewellers`);
                this.relatedProducts$ = this.collectionService.getRelatedProducts(product.id, product.category);
              } else {
                // If product not found, redirect to a 404 page or home
                this.router.navigate(['/']);
              }
            }),
            catchError(() => {
              this.router.navigate(['/']); // Redirect on error
              return of(undefined);
            })
          );
        }
        this.router.navigate(['/']); // Redirect if no ID
        return of(undefined);
      })
    );
  }

  selectImage(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.isAdded = true;
    this.isShaking = true;
    setTimeout(() => {
      this.isAdded = false;
      this.isShaking = false;
    }, 2000);
  }

  getAverageRating(reviews: Review[] | undefined): number {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }
}
