import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { ServerAnimationService } from './server-animation.service';
import { BotCrawlerService } from '../bot-crawler/bot-crawler.service';
import { TransferStateService } from '../transfer-state/transfer-state.service';

describe('ServerAnimationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ServerAnimationService, BotCrawlerService, TransferState, TransferStateService],
        });
    });

    it('should be created', inject([ServerAnimationService], (service: ServerAnimationService) => {
        expect(service).toBeTruthy();
    }));
});
