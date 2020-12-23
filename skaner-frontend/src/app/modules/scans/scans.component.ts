import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ScansClient } from '@/core/api/api-clients';
import { IScanStatus, IScanViewModel, ScannerStatus } from "../../core/api/types";
import { StatusService } from "../../core/services/status.service";
import { filter, first, pairwise, switchMap, tap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-scans',
  templateUrl: './scans.component.html',
  styleUrls: ['./scans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScansComponent implements OnDestroy {

  public _scans: IScanViewModel[];
  private _sub: Subscription;

  constructor(
    private readonly _scansClient: ScansClient,
    private readonly _statusService: StatusService,
    private readonly _cdr: ChangeDetectorRef,
  ) {
    this.getScans();
    this._sub = this._statusService.status$.pipe(
      pairwise(),
      filter((values: IScanStatus[]) => {
        return values[0].scannerStatus === ScannerStatus.Done && values[1].scannerStatus === ScannerStatus.Connected;
      }),
      switchMap(() => this._scansClient.getScans()),
    ).subscribe((scans: IScanViewModel[]) => {
      this.updateScans(scans);
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  private getScans(): void {
    this._scansClient.getScans().pipe(
      first(),
    ).subscribe(scans => {
      this.updateScans(scans);
    });
  }

  private updateScans(scans: IScanViewModel[]): void {
    this._scans = scans;
    this._cdr.markForCheck();
  }
}
