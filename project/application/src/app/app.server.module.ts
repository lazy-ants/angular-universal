import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from '@app/app.module';
import { AppComponent } from '@app/app.component';

@NgModule({
    imports: [AppModule, ServerModule, ModuleMapLoaderModule, ServerTransferStateModule],
    providers: [
        // Add universal-only providers here
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
