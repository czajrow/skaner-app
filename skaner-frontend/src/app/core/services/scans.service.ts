import { Injectable } from '@angular/core';
import { ScanningStatus } from './scanning.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ScanViewModel {
  id: string;
  name: string;
  createDate: string;
  status: ScanningStatus;
}

@Injectable({
  providedIn: 'root'
})
export class ScansService {

  private readonly _scans: ScanViewModel[] = [];
  private readonly _scansSubject: BehaviorSubject<ScanViewModel[]> = new BehaviorSubject<ScanViewModel[]>(this._scans);
  public scans$: Observable<ScanViewModel[]> = this._scansSubject.asObservable();

  constructor() {
    this._scans.push({
      id: '0',
      name: 'Name',
      createDate: new Date().toDateString(),
      status: ScanningStatus.Done,
    });
    this._scansSubject.next(this._scans);
    this.scans$.subscribe(scans => {
      let a = '';
      scans.forEach(s => a = a + s.status + ' ');
      // console.log(a);
      // console.log('_scans', _scans);
    });
  }

  public addScan(name: string): void {
    this._scans.push({
      id: this._scans.length.toString(),
      name,
      createDate: new Date().toDateString(),
      status: ScanningStatus.NotConnected,
    });
    this._scansSubject.next(this._scans);
  }

  public updateScanStatus(id: string, status: ScanningStatus): void {
    const scanToUpdate = this._scans.find(scan => scan.id === id);
    if (!!scanToUpdate) {
      scanToUpdate.status = status;
      this._scansSubject.next(this._scans);
      // console.log(this._scans);
      let a = '';
      this._scans.forEach(s => a = a + s.status + ' ');
      console.log(a);
    }
  }
}
