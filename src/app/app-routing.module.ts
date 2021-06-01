import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserFormComponent} from './components/user-form/user-form.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserListResolver} from './resolvers/user-list.resolver';
import {UserResolver} from './resolvers/user.resolver';

const routes: Routes = [
    {
        path: 'users',
        children: [
            {
                path: '',
                component: UserListComponent,
                pathMatch: 'full',
                resolve: [
                    UserListResolver
                ]
            },
            {
                path: 'add',
                component: UserFormComponent
            },
            {
                path: ':userId',
                component: UserFormComponent,
                resolve: [
                    UserResolver
                ]
            }
        ]
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
    providers: [
        UserListResolver,
        UserResolver,
    ]
})
export class AppRoutingModule {
}
