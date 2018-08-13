import { TestBed, inject } from '@angular/core/testing';

import { HttpResponseStatusService } from './http-response-status.service';

describe('HttpResponseStatusService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpResponseStatusService],
        });
    });

    it(
        'should be created',
        inject([HttpResponseStatusService], (service: HttpResponseStatusService) => {
            expect(service).toBeTruthy();
        })
    );
});
