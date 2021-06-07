import {NgModule} from '@angular/core';
import {UserFormComponent} from './components/user-form/user-form.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {SharedModule} from '../shared/shared.module';
import {UsersRoutingModule} from './users-routing.module';


const components = [
    UserFormComponent,
    UserListComponent
];

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        SharedModule,
        UsersRoutingModule,
    ],
})
export class UsersModule {
}
