import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../../models/collection.model';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-product-review',
  standalone: true,
  imports: [CommonModule, StarRating],
  templateUrl: './product-review.html',
  styleUrls: ['./product-review.css']
})
export class ProductReview {
  @Input() review!: Review;
}

