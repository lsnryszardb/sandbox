import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html'
})
export class ContactFormComponent {
    @Input() group: FormGroup;

    contactTypes = [
        {code: 'EMAIL', description: 'e-mail'},
        {code: 'PHONE', description: 'phone'},
    ];
}
