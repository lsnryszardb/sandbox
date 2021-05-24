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
    // validationIndex = 0;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private formService: FormService
    ) {
        const createControlStateValidator = (field: string) => {
            return this.formService.createAsyncStateValidator(this.validationErrors$, field);
        };

        this.formGroup = this.fb.group({
            firstName: [''],
            lastName: [''],
            address: this.formService.createAddressFormGroup(null),
            contacts: this.fb.array([])
        });

        this.validationErrors$.subscribe((validationErrors) => {
            this.formGroup.get('firstName').setValidators([
                this.formService.createSyncStateValidator(validationErrors, 'firstName')
            ]);
            // this.formService.setFormGroupErrors(this.formGroup, validationErrors, '');

            // this.contactArray.setAsyncValidators(this.formService.createFormArrayStateValidator(this.validationErrors$, 'contacts'));
            this.formGroup.get('firstName').updateValueAndValidity();
        });
    }

    get contactArray(): FormArray {
        return this.formGroup.get('contacts') as FormArray;
    }

    addContactItem() {
        // const index = Math.max(this.validationIndex, this.contactArray?.controls?.length);
        // const contactFormGroup = this.formService.createContactFormGroup(this.validationErrors$, `contacts[${index}]`);
        const contactFormGroup = this.formService.createContactFormGroup(null);
        this.contactArray.push(contactFormGroup);
    }

    removeContactItem(index: number) {
        this.contactArray.removeAt(index);
    }

    submitUser() {
        // this.validationIndex = this.contactArray?.controls?.length;
        const user = this.formGroup.value;
        this.store.dispatch(new UserActions.Add(user));
    }

    getUserList() {
        this.store.dispatch(new UserActions.GetList());
    }
}
