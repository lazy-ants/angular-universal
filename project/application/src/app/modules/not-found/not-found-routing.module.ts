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
                        content: 'The example of the Angular Universal application based on Angular 6',
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class NotFoundRoutingModule {}
