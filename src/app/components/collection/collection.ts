import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define a clear structure for your product data
interface Product {
  id: number;
  name: string;
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets';
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection.html',
  styleUrls: ['./collection.css']
})
export class Collection implements OnInit {
  // In a real app, this data would come from a service/API
  allProducts: Product[] = [
    { id: 1, name: 'The Solitaire Dream', category: 'Rings', imageUrl: 'assets/ring-1.jpg', description: 'A timeless diamond solitaire ring.' },
    { id: 2, name: 'Emerald Pendant', category: 'Necklaces', imageUrl: 'assets/images/necklace-1.jpg', description: 'Featuring a stunning pear-shaped emerald.' },
    { id: 3, name: 'Pearl Drop Earrings', category: 'Earrings', imageUrl: 'assets/images/earrings-1.jpg', description: 'Classic elegance with freshwater pearls.' },
    { id: 4, name: 'Sapphire Eternity Band', category: 'Rings', imageUrl: 'assets/images/ring-2.jpg', description: 'A circle of deep blue sapphires.' },
    { id: 5, name: 'Gold Link Bracelet', category: 'Bracelets', imageUrl: 'assets/images/bracelet-1.jpg', description: 'A bold and modern statement piece.' },
    { id: 6, name: 'Diamond Studs', category: 'Earrings', imageUrl: 'assets/images/earrings-2.jpg', description: 'Essential for every jewelry collection.' },
    { id: 7, name: 'Ruby Heart Necklace', category: 'Necklaces', imageUrl: 'assets/images/necklace-2.jpg', description: 'A passionate and romantic design.' },
    { id: 8, name: 'The Royal Engagement', category: 'Rings', imageUrl: 'assets/images/ring-3.jpg', description: 'Inspired by iconic royal jewelry.' },
  ];

  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  ngOnInit(): void {
    // Initially, show all products
    this.filteredProducts = this.allProducts;

    // Automatically get unique categories from the product data
    const uniqueCategories = new Set(this.allProducts.map(p => p.category));
    this.categories = ['All', ...Array.from(uniqueCategories)];
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
