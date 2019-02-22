import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { CoreModule } from '../../core.module';
import { TransferStateService } from '../transfer-state/transfer-state.service';

interface PayloadDefinition {
    payload: {
        crawler: boolean;
    };
}

@Injectable({
    providedIn: CoreModule,
})
export class BotCrawlerService {
    private payloadServerName = 'BotCrawlerServicePayload';
    private payload = () =>
        new Promise((resolve, reject) => {
            let crawler;
            if (isPlatformServer(this.platformId)) {
                const req = this.injector.get(REQUEST);
                crawler = req.headers.crawler;
            } else if (isPlatformBrowser(this.platformId)) {
                crawler = false;
            } else {
                reject();
            }

            const payload = { crawler };

            resolve({ payload });
        });

    constructor(
        private injector: Injector,
        @Inject(PLATFORM_ID) private platformId: Object,
        private transferStateService: TransferStateService
    ) {}

    public checkIsCrawler(): Promise<boolean | any> {
        return new Promise((resolve, reject) => {
            this.transferStateService.savePayload(this.payload, this.payloadServerName).then(
                (res: PayloadDefinition) => {
                    resolve(res.payload ? res.payload.crawler : false);
                },
                error => {
                    reject(error);
                }
            );
        });
    }
}
