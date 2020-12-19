import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ScansService, ScanViewModel } from '../../../../core/services/scans.service';
import { ScanningService, ScanningStatus } from '../../../../core/services/scanning.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scan-container',
  templateUrl: './scan-container.component.html',
  styleUrls: ['./scan-container.component.scss']
})
export class ScanContainerComponent implements OnInit, OnDestroy {

  public _isInProgress = false;

  // public _status: ScanningStatus;
  public createDate: string;
  private _sub: Subscription;

  constructor(
    public readonly _scanningService: ScanningService,
    public readonly _scansService: ScansService,
    public readonly _router: Router,
  ) {
  }

  public _scan: ScanViewModel;

  @Input() set scan(value: ScanViewModel) {
    if (value) {
      this._scan = value;
      this.createDate = new Date(value.createDate).toDateString();
      // this._status = value.status;
      this._isInProgress = value.status !== ScanningStatus.Done;
      if (this._isInProgress) {
        this.watchScan();
      }
    }
  }

  ngOnInit(): void {
  }

  public onClick(): void {
    if (this._scan) {
      this._router.navigate(['scan-details', this._scan.id]);
    }
  }

  public watchScan(): void {
    this._sub?.unsubscribe();
    this._sub = this._scanningService.status$.subscribe(status => {
      // this._status = status;
      this._scansService.updateScanStatus(this._scan.id, status);
      if (status === ScanningStatus.Done) {
        this._isInProgress = false;
        this._sub.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}
