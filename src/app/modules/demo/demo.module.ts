import {NgModule} from '@angular/core';
import {DemoFormComponent} from './components/demo-form/demo-form.component';
import {DemoListComponent} from './components/demo-list/demo-list.component';
import {SharedModule} from '../shared/shared.module';
import {DemoRoutingModule} from './demo-routing.module';


const components = [
    DemoFormComponent,
    DemoListComponent
];

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        SharedModule,
        DemoRoutingModule,
    ],
})
export class DemoModule {
}
