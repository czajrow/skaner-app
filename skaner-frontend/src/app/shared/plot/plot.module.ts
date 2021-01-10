import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotComponent } from './plot.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { ReactiveFormsModule } from "@angular/forms";

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [PlotComponent],
  exports: [
    PlotComponent,
  ],
    imports: [
        CommonModule,
        PlotlyModule,
        ReactiveFormsModule,
    ]
})
export class PlotModule { }
