import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ValidationError} from '../models/validation-error.model';

@Injectable()
export class FormService {

    createStateValidator(validationErrors$: Observable<ValidationErrors>, field: string): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return validationErrors$.pipe(
                tap(validationErrors => {
                    control.setErrors(null, {emitEvent: false});
                    if (validationErrors?.[field]) {
                        control. setErrors(validationErrors[field], {emitEvent: false});
                    }
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
                validationErrors[validationError?.field][validationError?.code] = validationError?.description;
            });
        }
        return validationErrors;
    }
}
