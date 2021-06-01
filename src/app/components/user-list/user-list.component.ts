import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {UserState} from '../../state/user.state';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
    @Select(UserState.users) users$: Observable<User[]>;
    displayedColumns: string[] = ['name', 'address', 'operations'];
}
