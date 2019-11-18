import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        data: {
            seoProps: {
                title: 'Example web site: server-side rendering',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Example web site: server-side rendering',
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class LandingRoutingModule {}
