import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            seoProps: {
                title: 'Angular Universal: server-side rendering',
            },
            seoPropsToRemove: {
                title: true,
            },
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {}
