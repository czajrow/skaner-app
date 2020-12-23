import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IScanViewModel } from '@/core/api/types';
import { Router } from '@angular/router';
import { ScansClient } from '@/core/api/api-clients';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scan-container',
  templateUrl: './scan-container.component.html',
  styleUrls: ['./scan-container.component.scss']
})
export class ScanContainerComponent {

  public _creationDate: string;
  public _scan: IScanViewModel;
  @Input() editMode: boolean;
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private readonly _router: Router,
    private readonly _scansClient: ScansClient,
    private readonly _toastrService: ToastrService,
  ) {
  }

  @Input() set scan(value: IScanViewModel) {
    if (value) {
      this._scan = value;
      const date = new Date(value.creationDate);
      this._creationDate = date.toLocaleString();
    }
  }

  public onClick(): void {
    this._router.navigate(['scan-details', this._scan?._id]);
  }

  public onDelete(e: Event): void {
    e.stopPropagation();
    if (window.confirm(`Do you want to delete '${this._scan.parameters.name}'?`)) {
      this._scansClient.deleteScan(this._scan._id).subscribe(id => {
        this.deleted.emit(id);
        this._toastrService.info('\'' + this._scan.parameters.name + '\' deleted');
      });
    }
  }

}
