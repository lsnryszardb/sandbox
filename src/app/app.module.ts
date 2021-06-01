import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {MaterialModule} from './material.module';
import {UserState} from './state/user.state';
import {UserService} from './services/user.service';
import {FormService} from './services/form.service';
import {TextInputComponent} from './components/text-input/text-input.component';
import {AddressFormComponent} from './components/address-form/address-form.component';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import {SelectComponent} from './components/select/select.component';
import {ErrorsComponent} from './components/errors/errors.component';
import {ValidationModule} from './modules/validation/validation.module';
import {UserListComponent} from './components/user-list/user-list.component';

@NgModule({
    declarations: [
        AppComponent,
        AddressFormComponent,
        ContactFormComponent,
        ErrorsComponent,
        SelectComponent,
        TextInputComponent,
        UserFormComponent,
        UserListComponent
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
        ValidationModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    providers: [
        FormService,
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
