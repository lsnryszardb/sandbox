import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../../../../state/user/user.state';
import {Observable} from 'rxjs';
import {FormService} from '../../../shared/services/form.service';
import {User} from '../../../../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {DemoActions} from '../../../../state/demo/demo.actions';

@Component({
    selector: 'app-user-form',
    templateUrl: './demo-form.component.html',
    styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent {
    @Select(UserState.validationErrors) validationErrors$: Observable<ValidationErrors>;
    formGroup: FormGroup;
    user: User;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private formService: FormService,
        private route: ActivatedRoute
    ) {
        this.user = this.route?.snapshot?.data?.user || null;
        this.formGroup = this.fb.group({
            id: [''],
            firstName: ['', [Validators.required]],
            lastName: [''],
        });
    }

    submitUser() {
        const user = this.formGroup.value;
        this.store.dispatch(new DemoActions.Set(user));
    }

    getUserList() {
        this.store.dispatch(new DemoActions.GetList());
    }

    getErrors(formControlName: string) {
        const fieldErrors = this.formGroup?.get(formControlName)?.errors;
        return fieldErrors ? Object.keys(fieldErrors) : null;
    }
}
