import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Injectable()
export class FormService {
    constructor(private fb: FormBuilder) {
    }

    createAddressFormGroup(): FormGroup {
        return this.fb.group({
            city: [''],
            streetName: [''],
            streetNumber: [''],
            flatNumber: [''],
        });
    }

    createContactFormGroup(): FormGroup {
        return this.fb.group({
            type: [''],
            email: [''],
            phone: [''],
        });
    }
}
