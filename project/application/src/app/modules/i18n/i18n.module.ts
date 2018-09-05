import { NgModule, APP_INITIALIZER, PLATFORM_ID, Injectable, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    LOCALE_CONFIG,
    TRANSLATION_CONFIG,
    LocaleConfig,
    TranslationConfig,
    L10nConfig,
    L10nLoader,
    LocalizationModule,
    StorageStrategy,
    ProviderType,
} from 'angular-l10n';

import { CookieService } from '../core/services/cookie/cookie.service';
import { HttpRequestDataService } from '../core/services/http-request-data/http-request-data.service';

interface I18nLocale {
    language: string;
    country: string;
    currency: string;
}

export const I18nLocales: { en: I18nLocale; de: I18nLocale } = {
    en: {
        language: 'en',
        country: 'GB',
        currency: 'GBP',
    },
    de: {
        language: 'de',
        country: 'DE',
        currency: 'EUR',
    },
};

export const I18nTimezone = 'UTC';

const l10nConfig: L10nConfig = {
    locale: {
        languages: [
            {
                code: I18nLocales.en.language,
                dir: 'ltr',
            },
            {
                code: I18nLocales.de.language,
                dir: 'ltr',
            },
        ],
        defaultLocale: {
            languageCode: I18nLocales.en.language,
            countryCode: I18nLocales.en.country,
        },
        currency: I18nLocales.en.currency,
        storage: StorageStrategy.Cookie,
        timezone: I18nTimezone,
    },
    translation: {
        composedKeySeparator: '.',
        caching: true,
        missingValue: '',
    },
};

@Injectable()
export class LocalizationConfigService {
    constructor(
        private l10nLoader: L10nLoader,
        private cookieService: CookieService,
        private httpRequestDataService: HttpRequestDataService,
        @Inject(LOCALE_CONFIG) private localeConfig: LocaleConfig,
        @Inject(TRANSLATION_CONFIG) private translationConfig: TranslationConfig,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    load(): Promise<void> {
        let domain = '';
        if (isPlatformServer(this.platformId)) {
            domain = this.httpRequestDataService.getApplicationUrl();
        } else if (isPlatformBrowser(this.platformId)) {
            domain = '.';
        } else {
            return Promise.resolve();
        }

        this.translationConfig.providers = [
            { type: ProviderType.Static, prefix: `${domain}/assets/i18n/home.component.` },
        ];

        const [languageCode, countryCode] = (this.cookieService.get('defaultLocale') || '').split('-');
        const currency = this.cookieService.get('currency');
        const timezone = this.cookieService.get('timezone');

        if (languageCode && countryCode) {
            this.localeConfig.defaultLocale.languageCode = languageCode;
            this.localeConfig.defaultLocale.countryCode = countryCode;
        }

        if (currency) {
            this.localeConfig.currency = currency;
        }

        if (timezone) {
            this.localeConfig.timezone = timezone;
        }

        return this.l10nLoader.load();
    }
}

export function initLocalization(localizationConfigService: LocalizationConfigService): Function {
    return () => localizationConfigService.load();
}

@NgModule({
    imports: [HttpClientModule, LocalizationModule.forRoot(l10nConfig)],
    exports: [LocalizationModule],
    providers: [
        CookieService,
        LocalizationConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initLocalization,
            deps: [LocalizationConfigService],
            multi: true,
        },
    ],
})
export class I18nModule {}
