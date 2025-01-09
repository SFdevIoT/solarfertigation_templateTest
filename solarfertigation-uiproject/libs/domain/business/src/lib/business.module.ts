import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { ActivityService } from './services/activity.service';
import { CultureService } from './services/culture.service';
import { MachineService } from './services/machine.service';
import { ZoneService } from './services/zone.service';

// Facades
import { ActivityFacade } from './facades/activity.facade';
import { CultureFacade } from './facades/culture.facade';
import { MachineFacade } from './facades/machine.facade';
import { ZoneFacade } from './facades/zone.facade';
import { PhaseConfigFacade } from './facades/phase-config.facade';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Services
    ActivityService,
    CultureService,
    MachineService,
    ZoneService,
    
    // Facades
    ActivityFacade,
    CultureFacade,
    MachineFacade,
    ZoneFacade,
    PhaseConfigFacade
  ]
})
export class BusinessModule {}
