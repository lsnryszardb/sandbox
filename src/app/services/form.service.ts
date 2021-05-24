import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {filter, first, map, take, tap} from 'rxjs/operators';
import {ValidationError} from '../models/validation-error.model';

@Injectable()
export class FormService {
    constructor(private fb: FormBuilder) {
    }

    createAsyncStateValidator(validationErrors$: Observable<ValidationErrors>, field: string): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (validationErrors$ === null) {
                return of(null);
            }
            return validationErrors$.pipe(
                // filter(Boolean),
                take(2),
                map(validationErrors => {
                    console.log('createStateValidator validationErrors', field, validationErrors);
                    if (control) {
                        // control.setErrors(null, {emitEvent: false});
                        if (validationErrors?.[field]) {
                            // control.setErrors(validationErrors[field], {emitEvent: false});
                            return validationErrors[field];
                            // return {required: true};
                        }
                    }
                    return null;
                })
            );
        };
    }

    createSyncStateValidator(validationErrors: ValidationErrors, field: string) {
        console.log('createSyncStateValidator', field, validationErrors);
        return (control: AbstractControl): ValidationErrors | null => {
            console.log('control', field, validationErrors);
            if (validationErrors?.[field]) {
                console.log('field error', field, validationErrors[field]);
                return validationErrors[field];
            }
            return null;
        };
    }

    createAddressFormGroup(validationErrors$: Observable<ValidationErrors>, fieldPrefix = 'address'): FormGroup {
        return this.fb.group({
            city: [''],
            streetName: [''],
            streetNumber: [''],
            flatNumber: [''],
        });
    }

    createContactFormGroup(validationErrors$: Observable<ValidationErrors>, fieldPrefix = 'contact'): FormGroup {
        return this.fb.group({
            type: [''],
            email: [''],
            phone: [''],
        });
    }

    createFormArrayStateValidator(validationErrors$: Observable<ValidationErrors>, fieldPrefix: string): AsyncValidatorFn {
        return (formControl: AbstractControl): Observable<ValidationErrors | null> => {
            if (!(formControl instanceof FormArray)) {
                return of(null);
            }
            const formArray = formControl as FormArray;
            return validationErrors$.pipe(
                take(1),
                tap(validationErrors => {
                    console.log('formArray', formArray, validationErrors);
                    formArray.controls.forEach((formGroup, index) => {
                        if (formGroup instanceof FormGroup) {
                            return Object.keys(formGroup?.controls).map(controlName => {
                                const controlPath = `${fieldPrefix}[${index}].${controlName}`;
                                const control = formArray.at(index).get(controlName);
                                if (control) {
                                    control.setErrors(null, {emitEvent: true});
                                    if (validationErrors?.[controlPath]) {
                                        control.setErrors(validationErrors[controlPath], {emitEvent: true});
                                    }
                                }
                            });
                        }
                    });
                })
            );
        };
    }

    setFormGroupValidators(formGroup: FormGroup, validationErrors$: Observable<ValidationErrors>, fieldPrefix) {
        Object.keys(formGroup?.controls).forEach(controlName => {
            console.log(controlName, formGroup?.get(controlName), `${fieldPrefix}.${controlName}`);
            formGroup?.get(controlName).setAsyncValidators([this.createAsyncStateValidator(validationErrors$, `${fieldPrefix}.${controlName}`)]);
        });
    }

    setFormControlErrors(formControl: FormControl, validationErrors: ValidationErrors, fieldName) {
        if (!formControl) {
            return;
        }
        formControl.setErrors(null, {emitEvent: true});
        if (validationErrors?.[fieldName]) {
            formControl.setErrors(validationErrors[fieldName], {emitEvent: true});
        }
    }

    setFormGroupErrors(formGroup: FormGroup, validationErrors: ValidationErrors, fieldPrefix) {
        Object.keys(formGroup?.controls).forEach(controlName => {
            const controlPath = fieldPrefix ? `${fieldPrefix}.${controlName}` : controlName;
            const control = formGroup.get(controlName);
            this.setAbstractControlErrors(control, validationErrors, controlPath);
        });
    }

    setFormArrayErrors(formArray: FormArray, validationErrors: ValidationErrors, fieldPrefix) {
        formArray.controls.forEach((formControl, index) => {
            if (formControl instanceof FormGroup) {
                Object.keys(formControl?.controls).forEach(controlName => {
                    const controlPath = `${fieldPrefix}[${index}].${controlName}`;
                    const control = formArray.at(index).get(controlName);
                    this.setAbstractControlErrors(control, validationErrors, controlPath);
                });
            }
        });
    }

    setAbstractControlErrors(control: AbstractControl, validationErrors: ValidationErrors, fieldPath) {
        if (control instanceof FormControl) {
            this.setFormControlErrors(control, validationErrors, fieldPath);
        } else if (control instanceof FormGroup) {
            this.setFormGroupErrors(control, validationErrors, fieldPath);
        } else if (control instanceof FormArray) {
            this.setFormArrayErrors(control, validationErrors, fieldPath);
        }
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
