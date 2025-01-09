export interface FertilizerData {
  label: string;
  percentage: number;
  capacity: number;
  color: string;
}

export interface MachineData {
  id: string;
  name: string;
  isActive: boolean;
  statusText: string;
  fertilizers: FertilizerData[];
}
