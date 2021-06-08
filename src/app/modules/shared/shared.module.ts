import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddressFormComponent} from './components/address-form/address-form.component';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import {ErrorsComponent} from './components/errors/errors.component';
import {SelectComponent} from './components/select/select.component';
import {TextInputComponent} from './components/text-input/text-input.component';
import {MaterialModule} from './material.module';
import {CommonModule} from '@angular/common';
import {FormService} from './services/form.service';
import {ValidationModule} from '../validation/validation.module';
import {SimpleTextInputComponent} from './components/simple-text-input/simple-text-input.component';


const components = [
    AddressFormComponent,
    ContactFormComponent,
    ErrorsComponent,
    SelectComponent,
    SimpleTextInputComponent,
    TextInputComponent,
];

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ValidationModule
];

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        ...modules,
    ],
    exports: [
        ...modules,
        ...components,
    ],
    providers: [
        FormService
    ]
})
export class SharedModule {
}
