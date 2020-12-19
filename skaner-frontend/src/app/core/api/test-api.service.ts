import { Injectable } from '@angular/core';
import { ProbeClient } from './api-clients';

@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  constructor(
    private readonly _probeClient: ProbeClient,
  ) { }

  test(): void {
    this._probeClient.getCoordinates().subscribe(coordinates => {
      console.log('coordinates', coordinates);
    });

    // this._probeClient.moveProbe({x: 1, y: 2, z: 3}).subscribe(); // TODO: CORSy
  }
}
