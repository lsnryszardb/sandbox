import {Component, Input} from '@angular/core';
import {Form, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {UserActions} from '../../state/user.actions';
import {UserState} from '../../state/user.state';
import {Observable} from 'rxjs';
import {FormService} from '../../services/form.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
    @Input() group: FormGroup;

    contactTypes = [
        {code: 'EMAIL', description: 'e-mail'},
        {code: 'PHONE', description: 'phone'},
    ];
}
