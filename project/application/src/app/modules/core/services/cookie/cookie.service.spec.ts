import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from './cookie.service';
import { HttpRequestDataService } from '../http-request-data/http-request-data.service';

describe('CookieService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [CookieService, HttpRequestDataService] });
    });

    it('should be created', inject([CookieService], (service: CookieService) => {
        expect(service).toBeTruthy();
    }));
});
