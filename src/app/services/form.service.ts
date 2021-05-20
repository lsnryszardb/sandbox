import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, Form, FormArray, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ValidationError} from '../models/validation-error.model';

@Injectable()
export class FormService {
    constructor(private fb: FormBuilder) {
    }

    createStateValidator(validationErrors$: Observable<ValidationErrors>, field: string): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (validationErrors$ === null) {
                return of(null);
            }
            return validationErrors$.pipe(
                tap(validationErrors => {
                    control.setErrors(null, {emitEvent: false});
                    if (validationErrors?.[field]) {
                        control.setErrors(validationErrors[field], {emitEvent: false});
                    }
                })
            );
        };
    }

    createFormArrayStateValidator(validationErrors$: Observable<ValidationErrors>, field: string): AsyncValidatorFn {
        return (formControl: AbstractControl): Observable<ValidationErrors | null> => {
            if (!(formControl instanceof FormArray)) {
                return of(null);
            }
            const formArray = formControl as FormArray;
            return validationErrors$.pipe(
                tap(validationErrors => {
                    formArray.controls.forEach((control, index) => {
                        control.setErrors(null, {emitEvent: false});
                        if (validationErrors?.[field]) {
                            control.setErrors(validationErrors[field], {emitEvent: false});
                        }
                    });

                })
            );
        };
    }

    createAddressFormGroup(validationErrors$: Observable<ValidationErrors>, fieldPrefix = 'address'): FormGroup {
        return this.fb.group({
            city: ['', [], [this.createStateValidator(validationErrors$, `${fieldPrefix}.city`)]],
            streetName: ['', [], [this.createStateValidator(validationErrors$, `${fieldPrefix}.streetName`)]],
            streetNumber: ['', [], [this.createStateValidator(validationErrors$, `${fieldPrefix}.streetNumber`)]],
            flatNumber: ['', [], [this.createStateValidator(validationErrors$, `${fieldPrefix}.flatNumber`)]],
        });
    }

    createContactFormGroup(validationErrors$: Observable<ValidationErrors>, fieldPrefix = 'contact'): FormGroup {
        return this.fb.group({
            type: ['', [], [this.createStateValidator(validationErrors$, `${fieldPrefix}.type`)]],
            email: ['', [], [this.createStateValidator(validationErrors$, `${fieldPrefix}.email`)]],
            phone: ['', [], [this.createStateValidator(validationErrors$, `${fieldPrefix}.phone`)]],
        });
    }

    setFormGroupValidators(formGroup: FormGroup, validationErrors$: Observable<ValidationErrors>, fieldPrefix) {
        Object.keys(formGroup?.controls).forEach(controlName => {
            console.log(controlName, formGroup?.get(controlName), `${fieldPrefix}.${controlName}`);
            formGroup?.get(controlName).setAsyncValidators([this.createStateValidator(validationErrors$, `${fieldPrefix}.${controlName}`)]);
        });
    }

    parseErrorResponse(errorResponse: ValidationError[]): ValidationErrors {
        const validationErrors = {};
        if (Array.isArray(errorResponse)) {
            errorResponse.forEach(validationError => {
                if (!validationErrors[validationError?.field]) {
                    validationErrors[validationError?.field] = {};
                }
                validationErrors[validationError?.field][validationError?.code] = validationError?.description;
            });
        }
        return validationErrors;
    }
}
