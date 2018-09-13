import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LocaleService, TranslationService, Language, DefaultLocale, Currency } from 'angular-l10n';

import { I18nLocales, I18nTimezone } from '../i18n/i18n.module';
import { SeoPropertiesService } from '../core/services/seo-properties/seo-properties.service';
import { TestingService as HttpTestingService } from '../core/http/testing/testing.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    @Language()
    lang: string;
    @DefaultLocale()
    defaultLocale: string;
    @Currency()
    currency: string;
    i18nLocales = I18nLocales;
    i18nTimezone = I18nTimezone;
    title: string;
    today: number;
    number: number;
    cash: number;

    constructor(
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: Object,
        private locale: LocaleService,
        private translation: TranslationService,
        private seoPropertiesService: SeoPropertiesService,
        private httpTestingService: HttpTestingService
    ) {}

    ngOnInit() {
        this.setSeoProps();
        this.testHttpService();
        this.translation.translationChanged().subscribe(() => {
            this.title = this.translation.translate('title');
        });
        this.today = 1536046063375; // timestamp
        this.number = 123456.789;
        this.cash = 12345.67;
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            // Be attention! This statement is required by the Angular Universal's bug
            // I found today. The ngOnDestroy() hook calls every time on the server side
            // when the browser page refreshes.
            this.seoPropertiesService.removeSeoProps(this.route.snapshot.data.seoPropsToRemove);
        }
    }

    selectEnLocale(): void {
        const { language, country, currency } = this.i18nLocales.en;
        this.selectLocale(language, country, currency);
    }

    selectDeLocale(): void {
        const { language, country, currency } = this.i18nLocales.de;
        this.selectLocale(language, country, currency);
    }

    private setSeoProps() {
        this.seoPropertiesService.setSeoProps(this.route.snapshot.data.seoProps);
    }

    private selectLocale(language: string, country: string, currency: string): void {
        this.locale.setDefaultLocale(language, country);
        this.locale.setCurrentCurrency(currency);
    }

    private testHttpService() {
        this.httpTestingService.testHttpService().subscribe((data: HttpResponse<any>) => {
            console.log(data);
        });
    }
}
