import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: '../home/home.module#HomeModule',
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
