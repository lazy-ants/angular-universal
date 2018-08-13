import { Component, OnInit } from '@angular/core';

import { HttpResponseStatusService } from '../core/services/http-response-status/http-response-status.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
    title = 'Not found page!';

    constructor(private httpResponseStatusService: HttpResponseStatusService) {}

    ngOnInit() {
        this.httpResponseStatusService.setStatus(404, 'Not Found');
    }
}
