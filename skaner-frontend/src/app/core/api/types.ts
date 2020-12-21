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

export interface IScanStatus {
  scannerStatus: ScannerStatus;
  progress: IProgress;
}

export enum ScannerStatus {
  Scanning = 'Scanning',
  Postprocessing = 'Postprocessing',
  Connected = 'Connected',
  NotConnected = 'NotConnected',
  Done = 'Done',
}

export interface IProgress {
  done: number;
  total: number;
}

export interface IResult {
  parameters: IParameters;
  result: string;
}

export interface IParameters {
  name: string;
  minX: number;
  maxX: number;
  stepX: number;
  minY: number;
  maxY: number;
  stepY: number;
  minZ: number;
  maxZ: number;
  stepZ: number;
  minFrequency: number;
  maxFrequency: number;
  stepFrequency: number;
}
