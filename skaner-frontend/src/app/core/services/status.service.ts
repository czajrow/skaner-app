import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { ScannerClient } from '@/core/api/api-clients';
import { switchMap } from 'rxjs/operators';
import { IScanStatus, ScannerStatus } from '@/core/api/types';

const NOT_CONNECTED: IScanStatus = {
  scannerStatus: ScannerStatus.NotConnected,
  progress: null,
};

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private readonly statusSubject: BehaviorSubject<IScanStatus> = new BehaviorSubject<IScanStatus>(NOT_CONNECTED);
  public status$: Observable<IScanStatus> = this.statusSubject.asObservable();

  constructor(
    private readonly _scannerClient: ScannerClient,
  ) {
    interval(1000).pipe(
      switchMap(() => this._scannerClient.getStatus()),
    ).subscribe(
      status => {
        this.statusSubject.next(status);
      },
      () => {
        this.statusSubject.next(NOT_CONNECTED);
      }
    );
  }
}
