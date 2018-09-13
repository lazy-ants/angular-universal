import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { DocumentMetaService } from './document-meta.service';
import { TransferStateService } from '../transfer-state/transfer-state.service';

describe('DocumentMetaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [DocumentMetaService, TransferState, TransferStateService] });
    });

    it('should be created', inject([DocumentMetaService], (service: DocumentMetaService) => {
        expect(service).toBeTruthy();
    }));
});
