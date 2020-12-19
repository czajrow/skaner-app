import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanningPageComponent } from './scanning-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ScanningModule } from '../../modules/scanning/scanning.module';

const routes: Routes = [
  {
    path: '',
    component: ScanningPageComponent,
  }
];

@NgModule({
  declarations: [ScanningPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScanningModule,
  ]
})
export class ScanningPageModule { }
