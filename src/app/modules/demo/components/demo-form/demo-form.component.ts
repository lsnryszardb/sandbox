import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {FormService} from '../../../shared/services/form.service';
import {User} from '../../../../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {DemoActions} from '../../../../state/demo/demo.actions';
import {DemoState} from '../../../../state/demo/demo.state';
import {ErrorStateMatcher} from '@angular/material/core';
import {filter, map, take} from 'rxjs/operators';

class InputErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control) {
        return control && control.invalid;
    }
}

@Component({
    selector: 'app-user-form',
    templateUrl: './demo-form.component.html',
    styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnDestroy {
    @Select(DemoState.validationErrors) validationErrors$: Observable<ValidationErrors>;
    formGroup: FormGroup;
    user: User;
    errorStateMatcher = new InputErrorStateMatcher();

    subscriptions: Subscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private formService: FormService,
        private route: ActivatedRoute
    ) {
        this.user = this.route?.snapshot?.data?.user || null;
        this.formGroup = this.fb.group({
            id: [''],
            firstName: [''],
            lastName: [''],
        });

        // this.setValidators();
    }

    submitUser() {
        const user = this.formGroup.value;
        this.store.dispatch(new DemoActions.Set(user));
    }

    getErrors(formControlName: string) {
        const fieldErrors = this.formGroup?.get(formControlName)?.errors;
        return fieldErrors ? Object.keys(fieldErrors) : null;
    }

    /* Validators */
    // setValidators() {
    //     this.subscriptions.add(this.validationErrors$.subscribe(
    //         (validationErrors) => {
    //             Object.keys(this.formGroup?.controls).forEach((controlName) => {
    //                 const control = this.formGroup?.get(controlName);
    //                 control.setValidators(this.createStateValidator(validationErrors, controlName));
    //                 control.updateValueAndValidity();
    //             });
    //         }
    //     ));
    // }
    //
    // createStateValidator(validationErrors: ValidationErrors, fieldPath: string) {
    //     return (): ValidationErrors | null => {
    //         if (validationErrors?.[fieldPath]) {
    //             return validationErrors[fieldPath];
    //         }
    //         return null;
    //     };
    // }

    /* AsyncValidators */
    // setAsyncValidators() {
    //     Object.keys(this.formGroup?.controls).forEach((controlName) => {
    //         const control = this.formGroup?.get(controlName);
    //         control.setAsyncValidators(this.createAsyncStateValidator(this.validationErrors$, controlName));
    //     });
    // }
    //
    // createAsyncStateValidator(validationErrors$: Observable<ValidationErrors>, fieldPath: string) {
    //     return () => {
    //         return validationErrors$.pipe(
    //             filter(Boolean),
    //             take(1),
    //             map((validationErrors) => {
    //                 if (validationErrors?.[fieldPath]) {
    //                     return validationErrors[fieldPath];
    //                 }
    //                 return null;
    //             }),
    //         );
    //     };
    // }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
