import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Repository Services
import { CultureRepositoryService } from './repositories/culture-repository.service';
import { MachineRepositoryService } from './repositories/machine-repository.service';
import { PhaseRepositoryService } from './repositories/phase-repository.service';
import { FieldRepositoryService } from './repositories/field-repository.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CultureRepositoryService,
    MachineRepositoryService,
    PhaseRepositoryService,
    FieldRepositoryService
  ]
})
export class RepositoryModule {}
