import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';

import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { I18nModule } from '../i18n/i18n.module';
import { SeoPropertiesService } from '../core/services/seo-properties/seo-properties.service';
import { DocumentTitleService } from '../core/services/document-title/document-title.service';
import { TransferStateService } from '../core/services/transfer-state/transfer-state.service';
import { DocumentMetaService } from '../core/services/document-meta/document-meta.service';
import { DocumentLinkService } from '../core/services/document-link/document-link.service';
import { HttpRequestDataService } from '../core/services/http-request-data/http-request-data.service';
import { TestingService } from '../core/http/testing/testing.service';

describe('LandingComponent', () => {
    let fixture: ComponentFixture<LandingComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, I18nModule],
            declarations: [LandingComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            data: {
                                seoProps: {
                                    title: 'Example web site: server-side rendering',
                                    metaTags: [
                                        {
                                            name: 'description',
                                            content:
                                                'Example web site: server-side rendering',
                                        },
                                        {
                                            name: 'keywords',
                                            content: 'Angular 7, Angular Universal, SSR',
                                        },
                                    ],
                                    linkTags: [
                                        {
                                            rel: 'canonical',
                                            href: 'https://example.web.com',
                                        },
                                    ],
                                },
                                seoPropsToRemove: {
                                    title: true,
                                    metaTagsSelectors: ['name="description"', 'name="keywords"'],
                                    linkTagsSelectors: ['rel="canonical"'],
                                },
                            },
                        },
                    },
                },
                TransferState,
                TransferHttpService,
                TransferStateService,
                SeoPropertiesService,
                DocumentTitleService,
                DocumentMetaService,
                DocumentLinkService,
                HttpRequestDataService,
                TestingService,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(LandingComponent);
    }));
    it('should create the app', async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'Landing page!'`, async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual(undefined);
    }));
    it('should render title in a h1 tag', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Landing page!');
    }));
});
