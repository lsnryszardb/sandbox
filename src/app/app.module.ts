import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {MaterialModule} from './material.module';
import {UserState} from './state/user.state';
import {environment} from '../environments/environment';
import {UserService} from './services/user.service';

@NgModule({
    declarations: [
        AppComponent,
        UserFormComponent
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
        NgxsFormPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
