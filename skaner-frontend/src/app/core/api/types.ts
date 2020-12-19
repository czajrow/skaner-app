import { Observable } from 'rxjs';

export interface ICoordinates {
  x: number;
  y: number;
  z: number;
}

export interface IProbe {
  moveProbe: (coordinates: ICoordinates) => Observable<void>;
  getCoordinates: () => Observable<ICoordinates>;
}
