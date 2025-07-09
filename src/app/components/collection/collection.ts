import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, finalize } from 'rxjs';
import { Product } from '../../models/collection.model';
import { CollectionService } from '../../services/collection.service';
import { ProductCard } from '../product-card/product-card';


@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './collection.html',
  styleUrls: ['./collection.css']
})
export class Collection implements OnInit {
  private collectionService = inject(CollectionService);

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;
    forkJoin({
        products: this.collectionService.getAllProducts(),
        categories: this.collectionService.getCategories(),
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(({ products, categories }) => {
        this.allProducts = products;
        this.filteredProducts = products;
        this.categories = categories;
      });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(p => p.category === category);
    }
  }
}
