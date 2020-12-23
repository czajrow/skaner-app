import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersViewComponent } from './parameters-view.component';



@NgModule({
    declarations: [ParametersViewComponent],
    exports: [
        ParametersViewComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ParametersViewModule { }
