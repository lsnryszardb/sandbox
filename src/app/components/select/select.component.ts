import {Component, Input} from '@angular/core';
import {DictionaryItem} from '../../models/dictionary-item.model';
import {CustomFormControl} from '../abstract/custom-form-control.component';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SelectComponent,
        multi: true
    }]
})
export class SelectComponent extends CustomFormControl {
    @Input() items: DictionaryItem[];
}
