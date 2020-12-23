import { Component, OnInit } from '@angular/core';
import { IParameters, IProgress, IScanStatus, IScanViewModel } from '@/core/api/types';
import { Observable } from 'rxjs';
import { CurrentScanClient } from '@/core/api/api-clients';
import { StatusService } from '@/core/services/status.service';
import { map } from "rxjs/operators";

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
  ) {
    this._currentScanClient.getParameters().subscribe(params => {
      this._parameters = params;
    });
    this._progress$ = this._statusService.status$.pipe(
      map((status: IScanStatus) => status?.progress),
    );
  }

  ngOnInit(): void {
  }
}
