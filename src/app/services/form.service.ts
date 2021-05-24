import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {ValidationError} from '../models/validation-error.model';

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
