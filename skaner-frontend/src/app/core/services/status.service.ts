import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';

export enum StatusOfConnection {
  Connected = 'Connected',
  Scanning = 'Scanning',
  Offline = 'Offline',
}

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private readonly statusSubject: BehaviorSubject<StatusOfConnection> = new BehaviorSubject<StatusOfConnection>(StatusOfConnection.Connected);
  public status$: Observable<StatusOfConnection> = this.statusSubject.asObservable();

  constructor() {
  }

  public setStatus(statusOfConnection: StatusOfConnection): void {
    this.statusSubject.next(statusOfConnection);
  }
}
