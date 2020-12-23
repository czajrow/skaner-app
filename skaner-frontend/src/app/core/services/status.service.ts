import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { StatusClient } from '@/core/api/api-clients';
import { switchMap } from 'rxjs/operators';
import { IScanStatus, ScannerStatus } from '@/core/api/types';
import { ToastrService } from "ngx-toastr";

const NOT_CONNECTED: IScanStatus = {
  scannerStatus: ScannerStatus.NotConnected,
  progress: null,
};

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private readonly _statusSubject: BehaviorSubject<IScanStatus> = new BehaviorSubject<IScanStatus>(NOT_CONNECTED);
  public status$: Observable<IScanStatus> = this._statusSubject.asObservable();
  private readonly _scanInProgressSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public scanInProgress$: Observable<boolean> = this._scanInProgressSubject.asObservable();

  constructor(
    private readonly _scannerClient: StatusClient,
    private readonly _toastrService: ToastrService,
  ) {
    interval(1000).pipe(
      switchMap(() => this._scannerClient.getStatus()),
    ).subscribe(
      status => {
        if (status.scannerStatus === ScannerStatus.Done) {
          this._toastrService.success('Scan completed');
        }
        if (
          status.scannerStatus === ScannerStatus.Scanning ||
          status.scannerStatus === ScannerStatus.Postprocessing ||
          status.scannerStatus === ScannerStatus.Done
        ) {
          this._scanInProgressSubject.next(true);
        } else {
          this._scanInProgressSubject.next(false);
        }
        this._statusSubject.next(status);
      },
      () => {
        this._scanInProgressSubject.next(false);
        this._statusSubject.next(NOT_CONNECTED);
      }
    );
  }
}
