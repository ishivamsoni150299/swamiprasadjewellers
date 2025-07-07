import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {
  title = 'The Legacy of Swami Prasad Jewellers';

  ourStory = {
    since: '1950',
    paragraph1: 'For over three generations, Swami Prasad Jewellers has been a hallmark of trust, purity, and exquisite craftsmanship. Founded in 1950 by the visionary Swami Prasad himself, our journey began with a simple mission: to create timeless pieces of jewelry that are not just ornaments, but heirlooms passed down with love.',
    paragraph2: 'From a humble workshop to a renowned name in fine jewelry, our commitment to quality and our customers has remained unwavering. We blend traditional artistry with contemporary designs to bring you jewelry that is both classic and modern.'
  };

  ourCraftsmanship = {
    title: 'Unmatched Craftsmanship',
    description: 'Every piece at Swami Prasad Jewellers is a testament to the skill of our master artisans. We source only the finest materials, from ethically-sourced diamonds to lustrous gold and silver, ensuring that every creation meets the highest standards of quality.',
    points: [
      { icon: '💎', text: 'Ethically Sourced Diamonds & Gemstones' },
      { icon: '✨', text: '916 Hallmarked Gold & 925 Sterling Silver' },
      { icon: '🎨', text: 'Intricate Handcrafted Designs' }
    ]
  };

  ourPromise = {
    title: 'Our Promise to You',
    description: 'Your trust is our most valued asset. We are dedicated to providing you with a transparent and delightful shopping experience, backed by our promise of authenticity, purity, and exceptional customer service.'
  };
}
