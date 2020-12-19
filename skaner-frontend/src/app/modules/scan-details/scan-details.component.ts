import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScansService, ScanViewModel } from '../../core/services/scans.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ScanningService, ScanningStatus } from '../../core/services/scanning.service';

@Component({
  selector: 'app-scan-details',
  templateUrl: './scan-details.component.html',
  styleUrls: ['./scan-details.component.scss']
})
export class ScanDetailsComponent implements OnInit, OnDestroy {

  public _isInProgress = false;
  public createDate: string;
  public _scan: ScanViewModel;
  private _sub: Subscription;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _scansService: ScansService,
    public readonly _scanningService: ScanningService,
    public readonly _router: Router,
  ) {
    const id = +this._activatedRoute.snapshot.paramMap.get('id');
    this._scansService.scans$.pipe(
      take(1),
    ).subscribe(scans => {
      this._scan = scans[id];
      this.createDate = new Date(this._scan.createDate).toDateString();
      this._isInProgress = this._scan.status !== ScanningStatus.Done;
      if (this._isInProgress) {
        this.watchScan();
      }
    });
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
