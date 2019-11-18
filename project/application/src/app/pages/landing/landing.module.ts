import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from 'angular-l10n';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

@NgModule({
    imports: [CommonModule, LocalizationModule, LandingRoutingModule],
    declarations: [LandingComponent],
})
export class LandingModule {}
