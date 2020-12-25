import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IParameters, IProgress, IScanStatus } from '@/core/api/types';
import { Observable, of, throwError } from 'rxjs';
import { CurrentScanClient } from '@/core/api/api-clients';
import { StatusService } from '@/core/services/status.service';
import { map, mergeMap, retry } from "rxjs/operators";

@Component({
  selector: 'app-current-scan',
  templateUrl: './current-scan.component.html',
  styleUrls: ['./current-scan.component.scss']
})
export class CurrentScanComponent implements OnInit {

  public _parameters: IParameters;
  public _progress$: Observable<IProgress>;

  constructor(
    private readonly _currentScanClient: CurrentScanClient,
    private readonly _statusService: StatusService,
    private readonly _cdr: ChangeDetectorRef,
  ) {
    this._currentScanClient.getParameters()
      .pipe(
        mergeMap(val => {
          if (val?.name) {
            return of(val);
          }
          return throwError('Error!');
        }),
        retry(3),
      )
      .subscribe(params => {
      console.log(params);
      this._parameters = params;
      this._cdr.markForCheck();
    });
    this._progress$ = this._statusService.status$.pipe(
      map((status: IScanStatus) => status?.progress),
    );
  }

  ngOnInit(): void {
  }
}
