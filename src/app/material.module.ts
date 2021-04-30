import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const modules = [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
})
export class MaterialModule {
}
