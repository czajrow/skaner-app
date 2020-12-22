import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentScanComponent } from './current-scan.component';



@NgModule({
    declarations: [CurrentScanComponent],
    exports: [
        CurrentScanComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CurrentScanModule { }
