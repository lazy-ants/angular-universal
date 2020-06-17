import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            seoProps: {
                title: 'Angular 9. Server-side rendering',
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
export class HomeRoutingModule {}
