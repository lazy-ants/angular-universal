import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { DocumentTitleService } from './document-title.service';
import { TransferStateService } from '../transfer-state/transfer-state.service';

describe('DocumentTitleService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [DocumentTitleService, TransferState, TransferStateService] });
    });

    it('should be created', inject([DocumentTitleService], (service: DocumentTitleService) => {
        expect(service).toBeTruthy();
    }));
});
