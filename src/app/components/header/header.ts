import { Component, HostListener,inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass,CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgClass,CommonModule], // Now this component correctly manages its own dependencies
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
private cartService = inject(CartService);
  cartItemCount$!: Observable<number>;


  isNavbarCollapsed = true;
  isScrolled = false;

  constructor(public router: Router) {
  }
   ngOnInit(): void {
    this.cartItemCount$ = this.cartService.cart$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  navigate(route: string) {
    this.router.navigate([route]);
    this.isNavbarCollapsed = true;
  }
}
