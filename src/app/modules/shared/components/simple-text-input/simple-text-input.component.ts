import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';


@Component({
    selector: 'app-simple-text-input',
    templateUrl: './simple-text-input.component.html',
    styleUrls: ['./simple-text-input.component.scss'],
})
export class SimpleTextInputComponent {
    @Input() control: AbstractControl;
    @Input() label: string;

    get errors() {
        return this.control?.errors ? Object.values(this.control.errors) : [];
    }

    get formControl() {
        return this.control as FormControl;
    }
}
