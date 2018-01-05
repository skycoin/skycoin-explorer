import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoaderComponent } from "app/modules/shared/components/loader/loader.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [LoaderComponent],
    exports: [
        CommonModule,
        FormsModule,
        HttpModule,
        LoaderComponent
    ]
})
export class SharedModule { }  
