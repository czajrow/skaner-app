import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {SectionModule} from '../../shared/section/section.module';



@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        SectionModule
    ]
})
export class HomeModule { }
