import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProbeComponent } from './probe.component';
import { SectionModule } from "../../shared/section/section.module";
import { InputModule } from "../../shared/input/input.module";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
    declarations: [ProbeComponent],
    exports: [
        ProbeComponent
    ],
  imports: [
    CommonModule,
    SectionModule,
    InputModule,
    ReactiveFormsModule
  ]
})
export class ProbeModule { }
