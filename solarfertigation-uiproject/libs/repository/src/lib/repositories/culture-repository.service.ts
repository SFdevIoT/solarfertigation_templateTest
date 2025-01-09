import { Injectable } from '@angular/core';
import { Coltura, CulturaFase } from '@solarfertigation-uiproject/domain/interfaces';
import { cultureMockData, culturePhaseMockData } from '../mock/culture.mock';

@Injectable({
  providedIn: 'root'
})
export class CultureRepositoryService {
  getAllCultures(): Coltura[] {
    return Object.values(cultureMockData);
  }

  getCultureById(id: string): Coltura | undefined {
    return Object.values(cultureMockData).find(culture => culture.id === id);
  }

  getCulturesByZone(zoneId: string): Coltura[] {
    return Object.values(cultureMockData).filter(culture => culture.zoneId === zoneId);
  }

  getCulturesByField(fieldId: string): Coltura[] {
    return Object.values(cultureMockData).filter(culture => culture.fieldId === fieldId);
  }

  // Metodi per le fasi
  getCulturePhases(cultureId: string): CulturaFase[] {
    return culturePhaseMockData[cultureId] || [];
  }

  getActivePhase(cultureId: string): CulturaFase | undefined {
    return this.getCulturePhases(cultureId).find(phase => phase.status === 'active');
  }

  getCompletedPhases(cultureId: string): CulturaFase[] {
    return this.getCulturePhases(cultureId).filter(phase => phase.status === 'completed');
  }
}
