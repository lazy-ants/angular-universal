import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import { RoutingModule } from '../routing/routing.module';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: 'angular-universal' }),
        BrowserTransferStateModule,
        RoutingModule,
    ],
})
export class CoreModule {}
