import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {UserActions} from '../../state/user.actions';
import {UserState} from '../../state/user.state';
import {Observable} from 'rxjs';
import {FormService} from '../../services/form.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
    @Select(UserState.validationErrors) validationErrors$: Observable<ValidationErrors>;

    formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private formService: FormService
    ) {
        this.formGroup = this.fb.group({
            firstName: ['', [], [this.formService.createStateValidator(this.validationErrors$, 'firstName')]],
            lastName: ['', [], [this.formService.createStateValidator(this.validationErrors$, 'lastName')]],
            email: ['', [], [this.formService.createStateValidator(this.validationErrors$, 'email')]],
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
