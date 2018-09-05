import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { Observable } from 'rxjs';

import { CoreModule } from '../../core.module';
import { HttpRequestDataService } from '../../services/http-request-data/http-request-data.service';

@Injectable({
    providedIn: CoreModule,
})
export class TestingService {
    constructor(private http: TransferHttpService, private httpRequestDataService: HttpRequestDataService) {}

    public testHttpService(): Observable<HttpResponse<any>> {
        const dataUrl = this.httpRequestDataService.getApplicationUrl();

        // The request will be processed ONE time: on the server side or on the browser side.
        // When the application loads in the browser, the request will be processed on the server
        // side.
        // When the application has been loaded into the browser, the request will not be
        // processed on the browser side, because it was already processed on the server side.
        // Next time while the user will be surf on the application, the request will be
        // processed on the browser side.
        //
        // This issue is very important with the SSR implementation way because of the default
        // HttpClient. It will be processed the request TWICE: on the server side and on the
        // browser side.
        return this.http.get(`${dataUrl}/assets/testing/data.json`, { observe: 'response' });
    }
}
