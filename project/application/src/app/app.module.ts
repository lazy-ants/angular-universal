import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AppComponent } from '@angular-universal/app.component';

@NgModule({
    imports: [BrowserModule.withServerTransition({ appId: 'angular-universal' }), BrowserTransferStateModule],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(APP_ID) private appId: string) {
        const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';

        console.log(`Running ${platform} with appId=${appId}`);
    }
}
