import { Injectable } from '@angular/core';
import { ProbeClient, StatusClient, ScansClient, CurrentScanClient } from './api-clients';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  constructor(
    private readonly _probeClient: ProbeClient,
    private readonly _scannerClient: StatusClient,
    private readonly _scansListClient: ScansClient,
    private readonly _currentScanClient: CurrentScanClient,
  ) {
  }

  test(): void {
    this._probeClient.getCoordinates()
      .pipe(
        tap(() => console.log('Testing ProbeClient...')),
        tap(cord => console.log('getCoordinates', cord)),
      )
      .pipe(
        switchMap(() => this._probeClient.moveProbe({ x: 1, y: 2, z: 3 })),
        tap(() => console.log('moveProbe')),
      )
      .pipe(
        switchMap(() => this._probeClient.getCoordinates()),
        tap(cord => console.log('getCoordinates', cord)),
      )
      .subscribe();

    this._scansListClient.getScans()
      .pipe(
        tap(() => console.log('Testing ScansClient...')),
        tap(scans => console.log('getScans', scans)),
      ).subscribe();

    this._currentScanClient.getParameters()
      .pipe(
        tap(() => console.log('Testing CurrentScanClient...')),
        tap(params => console.log('getParameters', params)),
      ).subscribe();
  }
}
