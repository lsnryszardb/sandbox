import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
})
export class TextInputComponent {
    @Input() control: FormControl;
    @Input() label: string;

    get errors() {
        return this.control?.errors ? Object.keys(this.control.errors) : [];
    }
}
