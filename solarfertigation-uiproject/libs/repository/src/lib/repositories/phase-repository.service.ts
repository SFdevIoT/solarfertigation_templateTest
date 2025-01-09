import { Injectable } from '@angular/core';
import { CultureType } from '@solarfertigation-uiproject/domain/interfaces';
import { phaseMockData } from '../mock/phase.mock';

@Injectable({
  providedIn: 'root'
})
export class PhaseRepositoryService {
  getPhasesByType(type: CultureType): string[] {
    return phaseMockData[type] || [];
  }

  getAllPhaseTypes(): CultureType[] {
    return Object.keys(phaseMockData) as CultureType[];
  }
}
