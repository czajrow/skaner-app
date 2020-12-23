import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanDetailsComponent } from './scan-details.component';
import { PlotModule } from '../../shared/plot/plot.module';
import { SectionModule } from "../../shared/section/section.module";
import { ParametersViewModule } from "../../shared/parameters-view/parameters-view.module";



@NgModule({
    declarations: [ScanDetailsComponent],
    exports: [
        ScanDetailsComponent
    ],
  imports: [
    CommonModule,
    PlotModule,
    SectionModule,
    ParametersViewModule
  ]
})
export class ScanDetailsModule { }
