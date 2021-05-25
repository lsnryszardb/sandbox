import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroupDirective, ValidationErrors} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {ValidationService} from '../services/validation.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[connectForm]'
})
export class ConnectFormDirective implements OnInit, OnDestroy {
    @Input('connectForm') validationErrors$: Observable<ValidationErrors>;

    subscriptions = new Subscription();

    constructor(
        private formGroupDirective: FormGroupDirective,
        private validationService: ValidationService,
    ) {
    }

    ngOnInit() {
        this.subscriptions.add(
            this.validationErrors$.subscribe((validationErrors) => {
                this.validationService.setFormGroupValidators(this.formGroupDirective.form, validationErrors, '');
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
