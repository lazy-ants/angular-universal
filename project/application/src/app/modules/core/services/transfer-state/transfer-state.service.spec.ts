import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { TransferStateService } from './transfer-state.service';

describe('TransferStateService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TransferState, TransferStateService],
        });
    });

    it('should be created', inject([TransferStateService], (service: TransferStateService) => {
        expect(service).toBeTruthy();
    }));
});
