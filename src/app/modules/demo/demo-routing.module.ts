import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoListComponent} from './components/demo-list/demo-list.component';
import {DemoFormComponent} from './components/demo-form/demo-form.component';
import {UserListResolver} from '../users/resolvers/user-list.resolver';
import {UserResolver} from '../users/resolvers/user.resolver';

const routes: Routes = [
    {
        path: '',
        component: DemoListComponent,
        pathMatch: 'full',
        resolve: {
            list: UserListResolver
        }
    },
    {
        path: 'add',
        component: DemoFormComponent
    },
    {
        path: ':userId',
        component: DemoFormComponent,
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
export class DemoRoutingModule {
}
