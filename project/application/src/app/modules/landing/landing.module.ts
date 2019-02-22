import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing.component';

@NgModule({
    imports: [LandingRoutingModule, SharedModule],
    declarations: [LandingComponent],
})
export class LandingModule {}
