import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';

const modules = [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
})
export class MaterialModule {
}
