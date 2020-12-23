import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBoxComponent } from './info-box.component';



@NgModule({
    declarations: [InfoBoxComponent],
    exports: [
        InfoBoxComponent
    ],
    imports: [
        CommonModule
    ]
})
export class InfoBoxModule { }
