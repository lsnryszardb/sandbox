import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
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
        private formService: FormService,
    ) {
        this.formGroup = this.fb.group({
            firstName: [''],
            lastName: [''],
            address: this.formService.createAddressFormGroup(),
            contacts: this.fb.array([])
        });
    }

    get contactArray(): FormArray {
        return this.formGroup.get('contacts') as FormArray;
    }

    addContactItem() {
        const contactFormGroup = this.formService.createContactFormGroup();
        this.contactArray.push(contactFormGroup);
    }

    removeContactItem(index: number) {
        this.contactArray.removeAt(index);
    }

    submitUser() {
        const user = this.formGroup.value;
        this.store.dispatch(new UserActions.Add(user));
    }

    getUserList() {
        this.store.dispatch(new UserActions.GetList());
    }
}
