import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserListResolver} from './resolvers/user-list.resolver';
import {UserFormComponent} from './components/user-form/user-form.component';
import {UserResolver} from './resolvers/user.resolver';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
        pathMatch: 'full',
        resolve: {
            list: UserListResolver
        }
    },
    {
        path: 'add',
        component: UserFormComponent
    },
    {
        path: ':userId',
        component: UserFormComponent,
        resolve: {
            user: UserResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        UserListResolver,
        UserResolver,
    ]
})
export class UsersRoutingModule {
}
