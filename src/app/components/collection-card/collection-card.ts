import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Collection } from '../../models/collection.model';

@Component({
  selector: 'app-collection-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './collection-card.html',
  styleUrls: ['./collection-card.css']
})
export class CollectionCardComponent {
  @Input({ required: true }) collection!: Collection;
}