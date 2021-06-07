import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ValidationModule} from './modules/validation/validation.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserState} from './state/user.state';
import {UserService} from './services/user.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgxsModule.forRoot([UserState], {
            developmentMode: !environment.production
        }),
        ValidationModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    providers: [
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
