import { Injectable, PLATFORM_ID, Inject, Injector } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { AppConfig } from '@app/app.config';

@Injectable()
export class CookieService {
    private appSettingsConfig = AppConfig;

    constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: Object) {}

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
                this.getApplicationHostname() +
                ';expires=' +
                new Date(+new Date() + expiryTimestamp).toUTCString();
        }
    }

    public remove(name: string): void {
        if (isPlatformBrowser(this.platformId)) {
            document.cookie =
                name + '=;path=/;domain=' + this.getApplicationHostname() + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
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

    private getApplicationHostname(): string {
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
