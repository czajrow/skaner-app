import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProbePageComponent } from './probe-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ProbeModule } from "../../modules/probe/probe.module";

const routes: Routes = [
  {
    path: '',
    component: ProbePageComponent,
  }
];

@NgModule({
  declarations: [ProbePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProbeModule,
  ]
})
export class ProbePageModule { }
