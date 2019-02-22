import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { BotCrawlerService } from './bot-crawler.service';
import { TransferStateService } from '../transfer-state/transfer-state.service';

describe('BotCrawlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BotCrawlerService, TransferState, TransferStateService],
        });
    });

    it('should be created', inject([BotCrawlerService], (service: BotCrawlerService) => {
        expect(service).toBeTruthy();
    }));
});
