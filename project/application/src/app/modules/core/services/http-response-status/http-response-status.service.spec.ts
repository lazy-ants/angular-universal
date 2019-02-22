import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { HttpResponseStatusService } from './http-response-status.service';
import { TransferStateService } from '../transfer-state/transfer-state.service';

describe('HttpResponseStatusService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpResponseStatusService, TransferState, TransferStateService],
        });
    });

    it('should be created', inject([HttpResponseStatusService], (service: HttpResponseStatusService) => {
        expect(service).toBeTruthy();
    }));
});
