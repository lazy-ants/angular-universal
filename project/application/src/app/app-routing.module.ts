import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule),
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: '**',
        loadChildren: () => import('@pages/not-found/not-found.module').then(m => m.NotFoundModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
