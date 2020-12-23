import { ICoordinates, IParameters, IProbe, IScanStatus, IScanViewModel } from './types';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class ProbeClient implements IProbe {

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  getCoordinates(): Observable<ICoordinates> {
    const url = BASE_URL + '/probe';
    const options = {
      responseType: 'json' as 'json',
    };

    return this._http.get(url, options).pipe(
      map(response => response as ICoordinates),
    );
  }

  moveProbe(coordinates: ICoordinates): Observable<void> {
    const url = BASE_URL + '/probe';
    const options = {
      responseType: 'json' as 'json',
    };

    return this._http.put(url, coordinates, options).pipe(
      switchMap(() => of(null)),
    );
  }

}

@Injectable({
  providedIn: 'root',
})
export class StatusClient {

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  getStatus(): Observable<IScanStatus> {
    const url = BASE_URL + '/status';
    return this._http.get(url).pipe(
      map(status => (status as { status: IScanStatus }).status as IScanStatus),
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class CurrentScanClient {

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  getParameters(): Observable<IParameters> {
    const url = BASE_URL + '/parameters';
    return this._http.get(url).pipe(
      map(parameters => parameters as IParameters),
    );
  }

  startScan(parameters: IParameters): Observable<void> {
    const url = BASE_URL + '/parameters';
    return this._http.post(url, parameters).pipe(
      map(() => null),
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class ScansClient {

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  getScans(): Observable<IScanViewModel[]> {
    const url = BASE_URL + '/scans';
    return this._http.get(url).pipe(
      map(array => array as IScanViewModel[]),
    );
  }

  getScan(id: string): Observable<IScanViewModel> {
    const url = BASE_URL + '/scan/' + id;
    return this._http.get(url).pipe(
      map(scan => scan as IScanViewModel),
    );
  }
}
