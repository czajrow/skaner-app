import { Component, OnInit } from '@angular/core';
import { StatusService } from '@/core/services/status.service';
import { Observable } from 'rxjs';
import { ScannerStatus } from '@/core/api/types';
import { map, tap } from 'rxjs/operators';

interface SidebarItem {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public _scannerStatus = ScannerStatus;
  public _status: Observable<ScannerStatus>;

  readonly items: SidebarItem[] = [
    {
      title: 'Scans',
      link: '/scans',
      icon: 'scans',
    },
    {
      title: 'Scanning',
      link: '/scanning',
      icon: 'scanning',
    },
  ];

  constructor(
    public readonly _statusService: StatusService,
  ) {
    this._status = this._statusService.status$.pipe(
      map((status) => {
        if (status.scannerStatus === ScannerStatus.NotConnected || status.scannerStatus === ScannerStatus.Connected) {
          return status.scannerStatus;
        } else {
          return ScannerStatus.Scanning;
        }
      }),
    );
  }

  ngOnInit(): void {
  }

}
