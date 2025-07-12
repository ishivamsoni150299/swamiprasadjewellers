import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.css']
})
export class StarRating implements OnChanges {
  @Input() rating: number = 0;
  @Input() maxRating: number = 5;

  stars: boolean[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating']) {
      this.stars = Array(this.maxRating).fill(false).map((_, i) => i < this.rating);
    }
  }
}

