import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {SectionModule} from '../../shared/section/section.module';



@NgModule({
    declarations: [SettingsComponent],
    exports: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        SectionModule
    ]
})
export class SettingsModule { }
