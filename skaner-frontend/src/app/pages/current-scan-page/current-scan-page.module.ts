import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentScanPageComponent } from './current-scan-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CurrentScanModule } from '../../modules/current-scan/current-scan.module';

const routes: Routes = [
  {
    path: '',
    component: CurrentScanPageComponent,
  }
];

@NgModule({
  declarations: [CurrentScanPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CurrentScanModule,
  ]
})
export class CurrentScanPageModule { }
