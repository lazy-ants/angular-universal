import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpModule } from '@gorniv/ngx-transfer-http';

import { RoutingModule } from '../routing/routing.module';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: 'example-web' }),
        BrowserTransferStateModule,
        RoutingModule,
        TransferHttpModule,
    ],
})
export class CoreModule {}
