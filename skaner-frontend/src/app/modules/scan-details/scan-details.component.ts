import { Component } from '@angular/core';
import { IResultViewModel, IScanViewModel } from '@/core/api/types';
import { ActivatedRoute } from '@angular/router';
import { ScansClient } from '@/core/api/api-clients';
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-scan-details',
  templateUrl: './scan-details.component.html',
  styleUrls: ['./scan-details.component.scss']
})
export class ScanDetailsComponent {

  public _creationDate: string;
  public _scan: IScanViewModel;
  public _result: IResultViewModel;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _scansClient: ScansClient,
  ) {
    const id: string = _activatedRoute.snapshot.paramMap.get('id');
    if (!!id) {
      this._scansClient.getScan(id)
        .pipe(
          tap((scan: IScanViewModel) => {
            this._scan = scan;
            const date = new Date(scan.creationDate);
            this._creationDate = date.toLocaleString();
          }),
          switchMap((scan: IScanViewModel) => this._scansClient.getResult(scan.resultId)),
        )
        .subscribe((result: IResultViewModel) => {
          this._result = result;
        });
    }
  }
}
