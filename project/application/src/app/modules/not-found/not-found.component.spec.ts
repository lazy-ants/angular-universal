import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { NotFoundComponent } from './not-found.component';
import { CoreModule } from '../core/core.module';

describe('NotFoundComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotFoundComponent],
            imports: [CoreModule, RouterTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            data: {
                                seoProps: {
                                    title: 'Page not found',
                                    metaTags: [
                                        {
                                            name: 'description',
                                            content:
                                                'The example of the Angular Universal application based on Angular 6',
                                        },
                                        {
                                            name: 'keywords',
                                            content: 'Angular 6, Angular Universal, SSR',
                                        },
                                    ],
                                    linkTags: [
                                        {
                                            rel: 'canonical',
                                            href: 'https://angular-universal.lazy-ants.com',
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
            ],
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(NotFoundComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'Page not found'`, async(() => {
        const fixture = TestBed.createComponent(NotFoundComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Page not found');
    }));
    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(NotFoundComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Page not found');
    }));
});
