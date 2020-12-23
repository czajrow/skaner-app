import { Component, Input } from '@angular/core';
import { IScanViewModel } from '@/core/api/types';

@Component({
  selector: 'app-scan-container',
  templateUrl: './scan-container.component.html',
  styleUrls: ['./scan-container.component.scss']
})
export class ScanContainerComponent {

  public _creationDate: string;
  public _scan: IScanViewModel;

  @Input() set scan(value: IScanViewModel) {
    if (value) {
      this._scan = value;
      const date = new Date(value.creationDate);
      this._creationDate = date.toLocaleString();
    }
  }

}
