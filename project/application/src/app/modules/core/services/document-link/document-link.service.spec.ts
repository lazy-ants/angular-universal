import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { DocumentLinkService } from './document-link.service';
import { TransferStateService } from '../transfer-state/transfer-state.service';

describe('DocumentLinkService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [DocumentLinkService, TransferState, TransferStateService] });
    });

    it('should be created', inject([DocumentLinkService], (service: DocumentLinkService) => {
        expect(service).toBeTruthy();
    }));
});
