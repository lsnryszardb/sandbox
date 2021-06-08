import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {UserActions} from '../../../../state/user/user.actions';
import {FormService} from '../../../shared/services/form.service';
import {User} from '../../../../models/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
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
            firstName: [''],
            lastName: [''],
            address: this.formService.createAddressFormGroup(),
            contacts: this.fb.array([])
        });
        if (this.user) {
            if (Array.isArray(this.user?.contacts)) {
                this.user.contacts.forEach(() => this.addContactItem());
            }
            this.formGroup.patchValue(this.user);
        }
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
        this.store.dispatch(new UserActions.Set(user));
    }

    getUserList() {
        this.store.dispatch(new UserActions.GetList());
    }
}
