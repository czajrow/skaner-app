import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentScanComponent } from './current-scan.component';
import { ParametersViewModule } from "../../shared/parameters-view/parameters-view.module";
import { SectionModule } from "../../shared/section/section.module";



@NgModule({
    declarations: [CurrentScanComponent],
    exports: [
        CurrentScanComponent
    ],
  imports: [
    CommonModule,
    ParametersViewModule,
    SectionModule
  ]
})
export class CurrentScanModule { }
