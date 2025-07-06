import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgClass], // Now this component correctly manages its own dependencies
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isNavbarCollapsed = true;
  isScrolled = false;

  constructor(public router: Router) {}

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
