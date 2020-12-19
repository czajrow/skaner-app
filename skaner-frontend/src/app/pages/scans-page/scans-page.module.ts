import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScansPageComponent } from './scans-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ScansModule } from '../../modules/scans/scans.module';

const routes: Routes = [
  {
    path: '',
    component: ScansPageComponent,
  }
];

@NgModule({
  declarations: [ScansPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScansModule,
  ]
})
export class ScansPageModule { }
