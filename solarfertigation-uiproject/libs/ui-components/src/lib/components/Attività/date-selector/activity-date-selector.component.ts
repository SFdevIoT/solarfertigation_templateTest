import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelettoreDataProps } from '../../../interfaces/attivita.types';

@Component({
  selector: 'sf-selettore-data',
  template: `
    <div class="selettore-data">
      <mat-icon>event</mat-icon>
      <mat-form-field appearance="outline">
        <mat-label>Data attività</mat-label>
        <input matInput [matDatepicker]="picker" 
               [value]="dataSelezionata" 
               (dateChange)="onDateChange($event)">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .selettore-data {
      background-color: var(--surface-color, white);
      padding: 1rem;
      border-bottom: 1px solid var(--border-color, #e0e0e0);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    mat-form-field {
      width: 200px;
    }
  `]
})
export class SelettoreDataComponent implements SelettoreDataProps {
  @Input() dataSelezionata: Date = new Date();
  @Output() onChange = new EventEmitter<Date>();

  onDateChange(event: any) {
    this.onChange.emit(event.value);
  }
}
