import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: '../landing/landing.module#LandingModule',
    },
    {
        path: '**',
        loadChildren: '../not-found/not-found.module#NotFoundModule',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
})
export class RoutingModule {}
