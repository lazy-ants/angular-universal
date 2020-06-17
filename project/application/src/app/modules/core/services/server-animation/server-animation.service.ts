import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@modules/core/components/base.component';
import { BotCrawlerService } from '../bot-crawler/bot-crawler.service';

@Injectable()
export class ServerAnimationService extends BaseComponent {
    public active = true;
    private readonly loadingTimeout = 1; // in ms

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private botCrawlerService: BotCrawlerService) {
        super();
        this.init();
    }

    private init() {
        this.botCrawlerService.checkIsCrawler().then((isCrawler: boolean) => {
            this.active = !isCrawler;
            if (isPlatformBrowser(this.platformId)) {
                of(null)
                    .pipe(delay(this.loadingTimeout), takeUntil(this.unsubscribe$))
                    .subscribe(_ => (this.active = false));
            }
        });
    }
}
