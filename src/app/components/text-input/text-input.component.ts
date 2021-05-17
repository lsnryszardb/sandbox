import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
    @Input() control: FormControl;
    @Input() label: string;

    get errors() {
        return this.control?.errors ? Object.keys(this.control.errors) : [];
    }
}
