import { Injectable } from '@angular/core';
import { Machine, Fertilizer } from '@solarfertigation-uiproject/domain/interfaces';
import { machineMockData, fertilizerMockData } from '../mock/machine.mock';

@Injectable({
  providedIn: 'root'
})
export class MachineRepositoryService {
  getAllMachines(): Machine[] {
    return Object.values(machineMockData);
  }

  getMachineById(id: string): Machine | undefined {
    return Object.values(machineMockData).find(machine => machine.id === id);
  }

  getMachinesByZone(zoneId: string): Machine[] {
    return Object.values(machineMockData).filter(machine => machine.zoneId === zoneId);
  }

  getFertilizersByMachine(machineId: string): Fertilizer[] {
    return Object.values(fertilizerMockData).filter(fert => fert.machineId === machineId);
  }
}
