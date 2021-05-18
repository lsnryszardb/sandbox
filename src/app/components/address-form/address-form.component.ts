import {Component, Input} from '@angular/core';
import {Form, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {UserActions} from '../../state/user.actions';
import {UserState} from '../../state/user.state';
import {Observable} from 'rxjs';
import {FormService} from '../../services/form.service';

@Component({
    selector: 'app-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
    @Input() group: FormGroup;
}
