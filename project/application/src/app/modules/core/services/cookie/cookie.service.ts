import { Injectable, PLATFORM_ID, Inject, Injector } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { CoreModule } from '../../core.module';
import { AppSettingsConfig } from '../../../../configs/app-settings.config';
import { HttpRequestDataService } from '../http-request-data/http-request-data.service';

@Injectable({
    providedIn: CoreModule,
})
export class CookieService {
    private appSettingsConfig = AppSettingsConfig;

    constructor(
        private injector: Injector,
        private httpRequestDataService: HttpRequestDataService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    public get(name: string): string | null {
        const cookiesParsed = this.parseCookies();

        return cookiesParsed[name] || null;
    }

    public set(name: string, value: string, expiryTimestamp: number): void {
        if (isPlatformBrowser(this.platformId)) {
            document.cookie =
                name +
                '=' +
                value +
                ';path=/;domain=' +
                this.httpRequestDataService.getApplicationHostname() +
                ';expires=' +
                new Date(+new Date() + expiryTimestamp).toUTCString();
        }
    }

    public remove(name: string): void {
        if (isPlatformBrowser(this.platformId)) {
            document.cookie =
                name +
                '=;path=/;domain=' +
                this.httpRequestDataService.getApplicationHostname() +
                ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }
    }

    private parseCookies(): any {
        const cookies = this.getCookiesRaw();
        const list = {};

        if (cookies) {
            cookies.split(';').forEach(cookie => {
                const parts = cookie.split('=');
                list[parts.shift().trim()] = decodeURI(parts.join('='));
            });
        }

        return list;
    }

    private getCookiesRaw(): string | null {
        if (this.appSettingsConfig.ssr) {
            if (isPlatformServer(this.platformId)) {
                const req = this.injector.get(REQUEST);
                return req.headers.cookie;
            } else if (isPlatformBrowser(this.platformId)) {
                return document.cookie;
            }
        } else {
            return document.cookie;
        }

        return null;
    }
}
