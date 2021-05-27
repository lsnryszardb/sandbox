import {ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ConnectFormDirective} from './directives/connect-form.directive';
import {ValidationService} from './services/validation.service';
import {NGXS_PLUGINS} from '@ngxs/store';
import {NgxsValidationPlugin} from './state/validation.plugin';


@NgModule({
    declarations: [
        ConnectFormDirective,
    ],
    imports: [
        ReactiveFormsModule,
    ],
    exports: [
        ConnectFormDirective,
        ReactiveFormsModule
    ],
    providers: [
        ValidationService
    ],
})
export class ValidationModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: ValidationModule,
            providers: [
                {
                    provide: NGXS_PLUGINS,
                    useClass: NgxsValidationPlugin,
                    multi: true
                }
            ]
        };
    }
}
