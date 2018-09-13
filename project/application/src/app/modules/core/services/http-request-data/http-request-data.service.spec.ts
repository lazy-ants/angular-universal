import { TestBed, inject } from '@angular/core/testing';

import { HttpRequestDataService } from './http-request-data.service';

describe('HttpRequestDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpRequestDataService],
        });
    });

    it('should be created', inject([HttpRequestDataService], (service: HttpRequestDataService) => {
        expect(service).toBeTruthy();
    }));
});
