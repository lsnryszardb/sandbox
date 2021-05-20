import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

const modules = [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
})
export class MaterialModule {
}
