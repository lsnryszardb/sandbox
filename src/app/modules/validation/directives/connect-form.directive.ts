import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import {Subject} from 'rxjs';
import {ValidationService} from '../services/validation.service';
import {ValidationActions} from '../state/validation.actions';
import {Store} from '@ngxs/store';
import {takeUntil} from 'rxjs/operators';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[connectForm]'
})
export class ConnectFormDirective implements OnInit, OnDestroy {
    @Input('connectForm') path: string;

    private destroyed$ = new Subject();

    constructor(
        private formGroupDirective: FormGroupDirective,
        private validationService: ValidationService,
        private store: Store
    ) {
    }

    ngOnInit() {
        const validationErrors$ = this.store.select((state) => {
            const resolvePath = (object, path) => path
                .split('.')
                .reduce((o, p) => o ? o[p] : undefined, object);
            const pathState = resolvePath(state, this.path);
            return this.path
                ? pathState?.validationErrors
                : null;
        });

        validationErrors$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((validationErrors) => {
                this.validationService.setFormGroupValidators(this.formGroupDirective.form, validationErrors, '');
                this.formGroupDirective.form.updateValueAndValidity();
            });

        this.store.dispatch(new ValidationActions.Set(this.path, null));
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.store.dispatch(new ValidationActions.Clear(this.path));
    }
}
