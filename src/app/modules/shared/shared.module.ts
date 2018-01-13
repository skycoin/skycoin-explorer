import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoadingComponent } from "app/modules/shared/components/loading/loading.component";
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AngularFontAwesomeModule
    ],
    declarations: [LoadingComponent],
    exports: [
        CommonModule,
        FormsModule,
        HttpModule,
        LoadingComponent,
        AngularFontAwesomeModule
    ]
})
export class SharedModule { }  
