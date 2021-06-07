import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'app-errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent {
    @Input() control: AbstractControl;

    get errors() {
        return this.control?.errors ? Object.values(this.control.errors) : [];
    }
}
