import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '@modules/core/components/base.component';
import { SeoPropertiesService } from '@modules/core/services/seo-properties/seo-properties.service';

@Component({
    selector: 'app-pages-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: Object,
        private seoPropertiesService: SeoPropertiesService,
    ) {
        super();
    }

    ngOnInit() {
        this.setSeoProps();
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            // Be attention! This statement is required by the Angular Universal's bug
            // I found today. The ngOnDestroy() hook calls every time on the server side
            // when the browser page refreshes.
            this.seoPropertiesService.removeSeoProps(this.route.snapshot.data.seoPropsToRemove);
        }

        super.ngOnDestroy();
    }

    private setSeoProps() {
        this.seoPropertiesService.setSeoProps(this.route.snapshot.data.seoProps);
    }
}
