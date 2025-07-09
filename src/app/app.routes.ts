import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Collection } from './components/collection/collection';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home | Swami Prasad Jewellers' },
  { path: 'collections', component: Collection, title: 'Collections | Swami Prasad Jewellers' },
  { path: 'about', component: About, title: 'About Us | Swami Prasad Jewellers' },
  { path: 'contact', component: Contact, title: 'Contact Us | Swami Prasad Jewellers' },
  { path: 'cart', component: Cart, title: 'Shopping Cart | Swami Prasad Jewellers' },
  { path: 'checkout', component: Checkout, title: 'Checkout | Swami Prasad Jewellers' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];