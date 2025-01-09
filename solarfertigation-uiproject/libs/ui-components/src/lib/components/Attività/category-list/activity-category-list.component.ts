import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoriaAttivita, CategoriaAttivitaItem, ListaCategorieProps, CATEGORIE_ATTIVITA } from '../../../interfaces/attivita.types';

@Component({
  selector: 'sf-activity-category-list',
  template: `
    <div class="categories-panel">
      <ul class="category-list">
        <li *ngFor="let categoria of categorie" 
            class="category-item"
            [class.active]="categoria.id === categoriaSelezionata"
            (click)="onCategoriaSelect(categoria.id)">
          <mat-icon>{{categoria.icona}}</mat-icon>
          {{categoria.nome}}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .categories-panel {
      background-color: var(--surface-color, white);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      padding: 1rem;
    }

    .category-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .category-item {
      padding: 0.75rem 1rem;
      margin: 0.5rem 0;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.2s;
    }

    .category-item:hover {
      background-color: rgba(46, 125, 50, 0.1);
    }

    .category-item.active {
      background-color: rgba(46, 125, 50, 0.2);
      font-weight: 500;
    }
  `]
})
export class ActivityCategoryListComponent implements ListaCategorieProps {
  @Input() categoriaSelezionata?: CategoriaAttivita;
  @Output() onSelect = new EventEmitter<CategoriaAttivita>();

  categorie: CategoriaAttivitaItem[] = CATEGORIE_ATTIVITA;

  onCategoriaSelect(categoria: CategoriaAttivita) {
    this.onSelect.emit(categoria);
  }
}
