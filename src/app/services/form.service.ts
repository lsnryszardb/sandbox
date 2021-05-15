import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class FormService {
    createStateValidator(selector: Observable<ValidationErrors>, field: string): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return selector.pipe(
                map(validationErrors => {
                    // return null;
                    console.log(control);
                    console.log(control.status);
                    if (control) {
                        // control.updateValueAndValidity();
                        control.setErrors(null, {emitEvent: false});
                        console.log('createStateValidator validationErrors', validationErrors);
                        if (validationErrors?.[field]) {
                            control.setErrors(validationErrors[field], {emitEvent: false});
                        }
                    }
                    return validationErrors?.[field] ? validationErrors?.[field] : null;
                })
            );
        };
    }
}
