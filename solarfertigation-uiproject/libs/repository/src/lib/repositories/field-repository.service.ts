import { Injectable } from '@angular/core';
import { Campo } from '@solarfertigation-uiproject/domain/interfaces';
import { fieldMockData } from '../mock/field.mock';

@Injectable({
  providedIn: 'root'
})
export class FieldRepositoryService {
  getAllFields(): Campo[] {
    return Object.values(fieldMockData);
  }

  getFieldById(id: string): Campo | undefined {
    return Object.values(fieldMockData).find(field => field.id === id);
  }

  getFieldsByZone(zoneId: string): Campo[] {
    return Object.values(fieldMockData).filter(field => field.zoneId === zoneId);
  }

  getFieldByCode(code: string): Campo | undefined {
    return fieldMockData[code];
  }
}
