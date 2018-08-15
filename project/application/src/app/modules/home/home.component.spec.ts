import { TestBed, async } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { HomeComponent } from './home.component';
import { SeoPropertiesService } from '../core/services/seo-properties/seo-properties.service';
import { DocumentTitleService } from '../core/services/document-title/document-title.service';
import { TransferStateService } from '../core/services/transfer-state/transfer-state.service';
import { DocumentMetaService } from '../core/services/document-meta/document-meta.service';
import { DocumentLinkService } from '../core/services/document-link/document-link.service';

describe('HomeComponent', () => {
    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [HomeComponent],
                providers: [
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            snapshot: {
                                data: {
                                    seoProps: {
                                        title: 'Page not found',
                                    },
                                    seoPropsToRemove: {
                                        title: true,
                                    },
                                },
                            },
                        },
                    },
                    TransferState,
                    TransferStateService,
                    SeoPropertiesService,
                    DocumentTitleService,
                    DocumentMetaService,
                    DocumentLinkService,
                ],
            }).compileComponents();
        })
    );
    it(
        'should create the app',
        async(() => {
            const fixture = TestBed.createComponent(HomeComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        })
    );
    it(
        `should have as title 'Home page!'`,
        async(() => {
            const fixture = TestBed.createComponent(HomeComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app.title).toEqual('Home page!');
        })
    );
    it(
        'should render title in a h1 tag',
        async(() => {
            const fixture = TestBed.createComponent(HomeComponent);
            fixture.detectChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h1').textContent).toContain('Home page!');
        })
    );
});
