import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {MaterialModule} from './material.module';
import {UserState} from './state/user.state';
import {environment} from '../environments/environment';
import {UserService} from './services/user.service';
import {FormService} from './services/form.service';
import {TextInputComponent} from './components/text-input/text-input.component';
import {AddressFormComponent} from './components/address-form/address-form.component';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import {SelectComponent} from './components/select/select.component';
import {ValidationService} from './services/validation.service';
import {ConnectFormDirective} from './directives/connect-form.directive';

@NgModule({
    declarations: [
        AppComponent,
        AddressFormComponent,
        ContactFormComponent,
        SelectComponent,
        TextInputComponent,
        UserFormComponent,
        ConnectFormDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        NgxsModule.forRoot([UserState], {
            developmentMode: !environment.production
        }),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    providers: [
        FormService,
        UserService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
