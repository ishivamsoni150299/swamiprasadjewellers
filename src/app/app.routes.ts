import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Collection } from './components/collection/collection';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
  { path: '', component: Home, title: 'Swami Prasad Jewellers - Home' },
  { path: 'collections', component: Collection, title: 'Our Collections' },
  { path: 'about', component: About, title: 'About Us' },
  { path: 'contact', component: Contact, title: 'Contact Us' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
