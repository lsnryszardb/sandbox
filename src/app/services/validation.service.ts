import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {ValidationError} from '../models/validation-error.model';

@Injectable()
export class ValidationService {
    createStateValidator(validationErrors: ValidationErrors, field: string) {
        return (): ValidationErrors | null => {
            if (validationErrors?.[field]) {
                return validationErrors[field];
            }
            return null;
        };
    }

    setControlValidators(control: AbstractControl, validationErrors: ValidationErrors, fieldName) {
        if (!control) {
            return;
        }
        control.setValidators([
            this.createStateValidator(validationErrors, fieldName)
        ]);
        control.updateValueAndValidity({onlySelf: true});
    }

    setFormGroupValidators(formGroup: FormGroup, validationErrors: ValidationErrors, fieldPrefix) {
        if (fieldPrefix) {
            this.setControlValidators(formGroup, validationErrors, fieldPrefix);
        }
        Object.keys(formGroup?.controls).forEach(controlName => {
            const controlPath = fieldPrefix ? `${fieldPrefix}.${controlName}` : controlName;
            const control = formGroup.get(controlName);
            this.setAbstractControlValidators(control, validationErrors, controlPath);
        });
    }

    setFormArrayValidators(formArray: FormArray, validationErrors: ValidationErrors, fieldPrefix) {
        if (fieldPrefix) {
            this.setControlValidators(formArray, validationErrors, fieldPrefix);
        }
        formArray.controls.forEach((formControl, index) => {
            if (formControl instanceof FormGroup) {
                Object.keys(formControl?.controls).forEach(controlName => {
                    const controlPath = `${fieldPrefix}[${index}].${controlName}`;
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
