import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProbeComponent } from './probe.component';



@NgModule({
    declarations: [ProbeComponent],
    exports: [
        ProbeComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ProbeModule { }
