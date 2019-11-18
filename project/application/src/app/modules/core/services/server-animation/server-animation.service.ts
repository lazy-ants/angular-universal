import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BotCrawlerService } from '../bot-crawler/bot-crawler.service';

@Injectable()
export class ServerAnimationService {
    public active = true;
    private loadingTimeout = 500; // in ms

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private botCrawlerService: BotCrawlerService) {
        this.init();
    }

    private init() {
        this.botCrawlerService.checkIsCrawler().then((isCrawler: boolean) => {
            this.active = !isCrawler;
            if (isPlatformBrowser(this.platformId)) {
                setTimeout(() => (this.active = false), this.loadingTimeout);
            }
        });
    }
}
