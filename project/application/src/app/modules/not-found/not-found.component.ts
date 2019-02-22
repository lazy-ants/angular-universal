import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HttpResponseStatusService } from '../core/services/http-response-status/http-response-status.service';
import { SeoPropertiesService } from '../core/services/seo-properties/seo-properties.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
    title = 'Page not found';

    constructor(
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: Object,
        private httpResponseStatusService: HttpResponseStatusService,
        private seoPropertiesService: SeoPropertiesService
    ) {}

    ngOnInit() {
        this.httpResponseStatusService.setStatus(404, 'Not Found');
        this.seoPropertiesService.setSeoProps(this.route.snapshot.data.seoProps);
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            // Be attention! This statement is required by the Angular Universal's bug
            // I found today. The ngOnDestroy() hook calls every time on the server side
            // when the browser page refreshes.
            this.seoPropertiesService.removeSeoProps(this.route.snapshot.data.seoPropsToRemove);
        }
    }
}
