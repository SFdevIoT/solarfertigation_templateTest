import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Machine, CardMacchinaProps } from '../../../interfaces/macchine.types';

/**
 * Componente per la visualizzazione di una macchina
 * 
 * @example
 * ```html
 * <sf-card-macchina
 *   [machine]="machine"
 *   (onSelect)="handleSelect($event)"
 * ></sf-card-macchina>
 * ```
 */
@Component({
  selector: 'sf-card-macchina',
  template: `
    <div class="machine-card" [class.active]="machine.isActive" (click)="onMachineSelect()">
      <div class="header">
        <h3>{{machine.name}}</h3>
        <span class="status">{{machine.statusText}}</span>
      </div>
      <div class="fertilizers">
        <div *ngFor="let fertilizer of machine.fertilizers" class="fertilizer">
          <div class="label">{{fertilizer.label}}</div>
          <div class="bar-container">
            <div class="bar" 
                 [style.width.%]="fertilizer.percentage"
                 [style.background-color]="fertilizer.color">
            </div>
          </div>
          <div class="capacity">{{fertilizer.capacity}}L</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .machine-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: all 0.2s;
    }

    .machine-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .machine-card.active {
      border: 2px solid #4CAF50;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }

    .status {
      font-size: 0.9rem;
      color: #666;
    }

    .fertilizers {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .fertilizer {
      display: grid;
      grid-template-columns: 80px 1fr 50px;
      align-items: center;
      gap: 0.5rem;
    }

    .label {
      font-size: 0.9rem;
      color: #666;
    }

    .bar-container {
      height: 8px;
      background: #eee;
      border-radius: 4px;
      overflow: hidden;
    }

    .bar {
      height: 100%;
      transition: width 0.3s ease;
    }

    .capacity {
      font-size: 0.9rem;
      color: #666;
      text-align: right;
    }
  `]
})
export class CardMacchinaComponent implements CardMacchinaProps {
  @Input() machine!: Machine;
  @Output() onSelect = new EventEmitter<Machine>();

  onMachineSelect() {
    this.onSelect.emit(this.machine);
  }
}
