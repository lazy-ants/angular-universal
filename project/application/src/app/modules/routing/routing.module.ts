import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../../pages/landing/landing.module').then(m => m.LandingModule),
    },
    {
        path: '**',
        loadChildren: () => import('../../pages/not-found/not-found.module').then(m => m.NotFoundModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
})
export class RoutingModule {}
