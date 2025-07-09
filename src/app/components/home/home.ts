import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Collection, Product } from '../../models/collection.model';
import { CollectionService } from '../../services/collection.service';
import { CollectionCardComponent } from '../collection-card/collection-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CollectionCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  animations: [
    trigger('fadeRotate', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ]),
    ]),
  ]
})
export class Home implements OnInit, OnDestroy {
  private collectionService = inject(CollectionService);
  private router = inject(Router);
  private featuredSub!: Subscription;

  isLoading = true;
  featuredCollections: Collection[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.featuredSub = this.collectionService.getDynamicFeaturedCollections()
      .subscribe((collections: Collection[]) => {
        if (this.isLoading) {
          this.isLoading = false;
        }
        this.featuredCollections = collections;
      });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.featuredSub?.unsubscribe();
  }

  trackByCollectionId(index: number, collection: Collection): string {
    return collection.id;
  }
}
