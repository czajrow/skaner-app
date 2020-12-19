import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanDetailsPageComponent } from './scan-details-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ScanDetailsModule } from '../../modules/scan-details/scan-details.module';

const routes: Routes = [
  {
    path: ':id',
    component: ScanDetailsPageComponent,
  },
  {
    path: '**',
    redirectTo: '/scans'
  }
];

@NgModule({
  declarations: [ScanDetailsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScanDetailsModule,
  ]
})
export class ScanDetailsPageModule { }
