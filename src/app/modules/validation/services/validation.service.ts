import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {ValidationError} from '../models/validation-error.model';

@Injectable()
export class ValidationService {
    createStateValidator(validationErrors: ValidationErrors, fieldPath: string) {
        return (): ValidationErrors | null => {
            if (validationErrors?.[fieldPath]) {
                return validationErrors[fieldPath];
            }
            return null;
        };
    }

    setControlValidators(control: AbstractControl, validationErrors: ValidationErrors, fieldPath) {
        if (!control) {
            return;
        }
        control.setValidators([
            this.createStateValidator(validationErrors, fieldPath)
        ]);
        control.updateValueAndValidity({onlySelf: true});
    }

    setFormGroupValidators(formGroup: FormGroup, validationErrors: ValidationErrors, fieldPath) {
        if (fieldPath) {
            this.setControlValidators(formGroup, validationErrors, fieldPath);
        }
        Object.keys(formGroup?.controls).forEach(controlName => {
            const controlPath = fieldPath ? `${fieldPath}.${controlName}` : controlName;
            const control = formGroup.get(controlName);
            this.setAbstractControlValidators(control, validationErrors, controlPath);
        });
    }

    setFormArrayValidators(formArray: FormArray, validationErrors: ValidationErrors, fieldPath) {
        if (fieldPath) {
            this.setControlValidators(formArray, validationErrors, fieldPath);
        }
        formArray.controls.forEach((formControl, index) => {
            if (formControl instanceof FormGroup) {
                Object.keys(formControl?.controls).forEach(controlName => {
                    const controlPath = `${fieldPath}[${index}].${controlName}`;
                    const control = formArray.at(index).get(controlName);
                    this.setAbstractControlValidators(control, validationErrors, controlPath);
                });
            }
        });
    }

    setAbstractControlValidators(control: AbstractControl, validationErrors: ValidationErrors, fieldPath) {
        if (control instanceof FormGroup) {
            this.setFormGroupValidators(control, validationErrors, fieldPath);
        } else if (control instanceof FormArray) {
            this.setFormArrayValidators(control, validationErrors, fieldPath);
        } else if (control instanceof FormControl) {
            this.setControlValidators(control, validationErrors, fieldPath);
        }
    }

    parseErrorResponse(errorResponse: ValidationError[]): ValidationErrors {
        if (!errorResponse) {
            return null;
        }
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
