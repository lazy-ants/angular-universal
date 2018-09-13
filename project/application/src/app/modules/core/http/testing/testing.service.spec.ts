import { TestBed, inject } from '@angular/core/testing';
import { HttpResponse, HttpClientModule } from '@angular/common/http';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';

import { TestingService } from './testing.service';
import { HttpRequestDataService } from '../../services/http-request-data/http-request-data.service';

describe('TestingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, BrowserTransferStateModule, HttpClientModule],
            providers: [TestingService, TransferHttpService, HttpRequestDataService],
        });
    });

    it('should be created', inject([TestingService], (service: TestingService) => {
        expect(service).toBeTruthy();
    }));

    it('should perform http request with 200 code', inject([TestingService], (service: TestingService) => {
        service.testHttpService().subscribe((data: HttpResponse<any>) => {
            expect(data.status).toEqual(200);
        });
    }));
});
