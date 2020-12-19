import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { StatusOfConnection, StatusService } from './status.service';

export enum ScanningStatus {
  Scanning = 'Scanning',
  Postprocessing = 'Postprocessing',
  Cancelling = 'Cancelling',
  Connected = 'Connected',
  NotConnected = 'NotConnected',
  Done = 'Done',
}

@Injectable({
  providedIn: 'root'
})
export class ScanningService implements OnDestroy {

  private _sub: Subscription;

  private readonly _statusSubject: BehaviorSubject<ScanningStatus> = new BehaviorSubject<ScanningStatus>(ScanningStatus.NotConnected);
  public readonly status$: Observable<ScanningStatus> = this._statusSubject.asObservable();

  private readonly _progressSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0.0);
  public readonly progress$: Observable<number> = this._progressSubject.asObservable();

  constructor(
    private readonly _statusService: StatusService,
  ) {
  }

  public scan(): void {
    this._statusService.setStatus(StatusOfConnection.Scanning);

    if (this._sub) {
      this._sub.unsubscribe();
    }
    this._sub = new Subscription();

    this._sub.add(interval(120).subscribe(count => {
      if (count > 100) {
        this.afterScan();
      } else if (count > 90) {
        this._statusSubject.next(ScanningStatus.Cancelling);
      } else if (count > 80) {
        this._statusSubject.next(ScanningStatus.Postprocessing);
      } else if (count > 3) {
        this._statusSubject.next(ScanningStatus.Scanning);
      }
      this._progressSubject.next(count / 100.0 > 1.0 ? 1.0 : count / 100.0);
    }));
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  private afterScan(): void {
    this._statusService.setStatus(StatusOfConnection.Connected);
    this._sub.unsubscribe();
    this._statusSubject.next(ScanningStatus.Done);
    this._progressSubject.next(0.0);
  }

}
