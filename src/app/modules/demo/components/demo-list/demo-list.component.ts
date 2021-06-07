import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {UserState} from '../../../../state/user/user.state';
import {Observable} from 'rxjs';
import {User} from '../../../../models/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './demo-list.component.html',
    styleUrls: ['./demo-list.component.scss']
})
export class DemoListComponent {
    @Select(UserState.users) users$: Observable<User[]>;
    displayedColumns: string[] = ['name', 'address', 'operations'];
}
