import { Injectable } from '@angular/core';
import { ProbeClient } from './api-clients';
import { switchMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  constructor(
    private readonly _probeClient: ProbeClient,
  ) { }

  test(): void {
    this._probeClient.getCoordinates()
      .pipe(
        tap(() => console.log('Testing Probe...')),
        tap(cord => console.log('getCoordinates', cord)),
      )
      .pipe(
        switchMap(() => this._probeClient.moveProbe({x: 1, y: 2, z: 3})),
        tap(() => console.log('moveProbe')),
      )
      .pipe(
        switchMap(() => this._probeClient.getCoordinates()),
        tap(cord => console.log('getCoordinates', cord)),
      )
      .subscribe();
  }
}
