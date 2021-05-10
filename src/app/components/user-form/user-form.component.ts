import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {UserActions} from '../../state/user.actions';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
    title = 'sandbox';

    formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store,
    ) {
        this.formGroup = this.fb.group({
            firstName: [''],
            lastName: [''],
            email: [''],
        });
    }

    addUser() {
        const user = this.formGroup.value;
        this.store.dispatch(new UserActions.Add(user));
    }

    getUserList() {
        this.store.dispatch(new UserActions.GetList());
    }
}
