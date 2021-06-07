import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'demo',
        loadChildren: () => import('./modules/demo/demo.module').then(m => m.DemoModule),
    },
    {
        path: 'users',
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
