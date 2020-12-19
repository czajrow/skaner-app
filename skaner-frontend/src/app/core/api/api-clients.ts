import { ICoordinates, IProbe } from './types';
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
