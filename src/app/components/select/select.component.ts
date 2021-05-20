import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {DictionaryItem} from '../../models/dictionary-item.model';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
    @Input() control: AbstractControl;
    @Input() items: DictionaryItem[];
    @Input() label: string;

    get formControl(): FormControl {
        return this.control as FormControl;
    }

    get errors() {
        return this.control?.errors ? Object.values(this.control.errors) : [];
    }
}
