import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class MaterialModule { }
