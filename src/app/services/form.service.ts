import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ValidationError} from '../models/form-state.model';

@Injectable()
export class FormService {
    createStateValidator(selector: Observable<ValidationErrors>, field: string): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return selector.pipe(
                map(validationErrors => {
                    control.setErrors(null, {emitEvent: false});
                    if (validationErrors?.[field]) {
                        control.setErrors(validationErrors[field], {emitEvent: false});
                    }
                    return validationErrors?.[field] ? validationErrors?.[field] : null;
                })
            );
        };
    }

    parseErrorResponse(errorResponse: ValidationError[]): ValidationErrors {
        const validationErrors = {};
        if (Array.isArray(errorResponse)) {
            errorResponse.forEach(validationError => {
                if (!validationErrors[validationError?.field]) {
                    validationErrors[validationError?.field] = {};
                }
                validationErrors[validationError?.field][validationError?.description] = true;
            });
        }
        return validationErrors;
    }
}
