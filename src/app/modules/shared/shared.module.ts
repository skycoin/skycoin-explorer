import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoaderComponent } from "app/modules/shared/components/loader/loader.component";
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AngularFontAwesomeModule
    ],
    declarations: [LoaderComponent],
    exports: [
        CommonModule,
        FormsModule,
        HttpModule,
        LoaderComponent,
        AngularFontAwesomeModule
    ]
})
export class SharedModule { }  
