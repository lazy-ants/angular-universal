import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { CoreModule } from '../../core.module';

@Injectable({
    providedIn: CoreModule,
})
export class HttpRequestDataService {
    constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * http://localhost:4200
     */
    public getApplicationUrl(): string {
        let url = '';
        if (isPlatformServer(this.platformId)) {
            const request = this.injector.get(REQUEST);
            url = request.protocol + '://' + request.get('host');
        } else if (isPlatformBrowser(this.platformId)) {
            const location = window.location;
            url = location.protocol + '//' + location.host;
        }

        return url;
    }

    /**
     * localhost:4200
     */
    public getApplicationHost(): string {
        let host = '';
        if (isPlatformServer(this.platformId)) {
            const request = this.injector.get(REQUEST);
            host = request.get('host');
        } else if (isPlatformBrowser(this.platformId)) {
            const location = window.location;
            host = location.host;
        }

        return host;
    }

    /**
     * localhost
     */
    public getApplicationHostname(): string {
        let hostname = '';
        if (isPlatformServer(this.platformId)) {
            const request = this.injector.get(REQUEST);
            hostname = request.hostname;
        } else if (isPlatformBrowser(this.platformId)) {
            const location = window.location;
            hostname = location.hostname;
        }

        return hostname;
    }
}
