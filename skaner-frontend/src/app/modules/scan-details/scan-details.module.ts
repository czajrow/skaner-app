import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanDetailsComponent } from './scan-details.component';
import { PlotModule } from '../../shared/plot/plot.module';



@NgModule({
    declarations: [ScanDetailsComponent],
    exports: [
        ScanDetailsComponent
    ],
  imports: [
    CommonModule,
    PlotModule
  ]
})
export class ScanDetailsModule { }
