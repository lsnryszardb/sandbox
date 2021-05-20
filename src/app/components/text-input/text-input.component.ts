import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
    @Input() control: AbstractControl;
    @Input() label: string;

    get formControl(): FormControl {
        return this.control as FormControl;
    }

    get errors() {
        return this.control?.errors ? Object.values(this.control.errors) : [];
    }
}
