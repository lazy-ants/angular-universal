import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslationService, Language, DefaultLocale, Currency } from 'angular-l10n';

import { SeoPropertiesService } from '@core/services/seo-properties/seo-properties.service';
import { I18nTimezone } from '@modules/i18n/i18n.module';

@Component({
    selector: 'app-pages-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
    @Language()
    lang: string;
    @DefaultLocale()
    defaultLocale: string;
    @Currency()
    currency: string;
    i18nTimezone = I18nTimezone;
    title: string;
    dateValue: number;
    numberValue: number;
    cashValue: number;

    constructor(
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: Object,
        private translation: TranslationService,
        private seoPropertiesService: SeoPropertiesService,
    ) {}

    ngOnInit() {
        this.setSeoProps();
        this.translation.translationChanged().subscribe(() => {
            this.title = this.translation.translate('title');
        });
        this.dateValue = 1536046063375;
        this.numberValue = 123456.789;
        this.cashValue = 12345.67;
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            // Be attention! This statement is required by the Angular Universal's bug
            // I found today. The ngOnDestroy() hook calls every time on the server side
            // when the browser page refreshes.
            this.seoPropertiesService.removeSeoProps(this.route.snapshot.data.seoPropsToRemove);
        }
    }

    private setSeoProps() {
        this.seoPropertiesService.setSeoProps(this.route.snapshot.data.seoProps);
    }
}
