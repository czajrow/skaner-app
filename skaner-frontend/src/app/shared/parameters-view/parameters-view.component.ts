import { Component, Input } from '@angular/core';
import { IParameters } from '@/core/api/types';

@Component({
  selector: 'app-parameters-view',
  templateUrl: './parameters-view.component.html',
  styleUrls: ['./parameters-view.component.scss']
})
export class ParametersViewComponent {

  @Input() parameters: IParameters;
}
