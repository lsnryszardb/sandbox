import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
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

    setFormControlValidators(formControl: FormControl, validationErrors: ValidationErrors, fieldName) {
        if (!formControl) {
            return;
        }
        formControl.setValidators([
           this.createStateValidator(validationErrors, fieldName)
        ]);
        formControl.updateValueAndValidity();
    }

    setFormGroupValidators(formGroup: FormGroup, validationErrors: ValidationErrors, fieldPrefix) {
        Object.keys(formGroup?.controls).forEach(controlName => {
            const controlPath = fieldPrefix ? `${fieldPrefix}.${controlName}` : controlName;
            const control = formGroup.get(controlName);
            this.setAbstractControlValidators(control, validationErrors, controlPath);
        });
    }

    setFormArrayValidators(formArray: FormArray, validationErrors: ValidationErrors, fieldPrefix) {
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
        if (control instanceof FormControl) {
            this.setFormControlValidators(control, validationErrors, fieldPath);
        } else if (control instanceof FormGroup) {
            this.setFormGroupValidators(control, validationErrors, fieldPath);
        } else if (control instanceof FormArray) {
            this.setFormArrayValidators(control, validationErrors, fieldPath);
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
