import {Component} from '@angular/core';
import {CustomFormControl} from '../abstract/custom-form-control.component';
import {NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TextInputComponent,
        multi: true
    }]
})
export class TextInputComponent extends CustomFormControl {
}
