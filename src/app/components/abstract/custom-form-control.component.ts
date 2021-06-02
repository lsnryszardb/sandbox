import {Component, Input, ViewChild} from '@angular/core';
import {ControlContainer, ControlValueAccessor, FormControl, FormControlDirective} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

class InputErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control) {
        return control && control.invalid;
    }
}

@Component({
    template: ''
})
// tslint:disable-next-line:component-class-suffix
export abstract class CustomFormControl implements ControlValueAccessor {
    @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;
    @Input() formControl: FormControl;
    @Input() formControlName: string;
    @Input() label: string;

    matcher = new InputErrorStateMatcher();

    constructor(protected controlContainer: ControlContainer) {
    }

    get control() {
        return (this.formControl || this.controlContainer?.control?.get(this.formControlName)) as FormControl;
    }

    registerOnTouched(fn: any): void {
        this.formControlDirective.valueAccessor.registerOnTouched(fn);
    }

    registerOnChange(fn: any): void {
        this.formControlDirective.valueAccessor.registerOnChange(fn);
    }

    writeValue(obj: any): void {
        this.formControlDirective.valueAccessor.writeValue(obj);
    }

    get errors() {
        return this.control?.errors ? Object.values(this.control.errors) : [];
    }
}
