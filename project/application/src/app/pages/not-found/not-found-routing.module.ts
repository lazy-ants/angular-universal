import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: NotFoundComponent,
        data: {
            seoProps: {
                title: 'Page not found',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Angular 9. Server-side rendering',
                    },
                    {
                        name: 'keywords',
                        content: 'Angular 9, Angular Universal, SSR',
                    },
                ],
                linkTags: [
                    {
                        rel: 'canonical',
                        href: 'https://domain.name/',
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
export class NotFoundRoutingModule {}
