import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ProbeClient } from '@/core/api/api-clients';
import { StatusService } from '@/core/services/status.service';
import { ICoordinates } from '@/core/api/types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-probe',
  templateUrl: './probe.component.html',
  styleUrls: ['./probe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProbeComponent {

  public _coordinates: ICoordinates;
  public _formGroup: FormGroup;

  constructor(
    private readonly _probeClient: ProbeClient,
    private readonly _statusService: StatusService,
    private readonly _formBuilder: FormBuilder,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _toastrService: ToastrService,
  ) {
    this._formGroup = this._formBuilder.group({
      x: [1, Validators.required],
      y: [2, Validators.required],
      z: [3, Validators.required],
    });
    this.updateCoordinates(true);
  }

  updateCoordinates(patch: boolean): void {
    this._probeClient.getCoordinates().subscribe(coords => {
      this._coordinates = coords;
      if (patch) {
        this.patchForm();
        this._toastrService.success('Probe\'s coordinates read.');
      } else {
        this._toastrService.success('Probe\'s coordinates updated.');
      }
      this._cdr.markForCheck();
    });
  }

  moveProbe(): void {
    const coordinates: ICoordinates = this._formGroup.value;
    this._probeClient.moveProbe(coordinates).subscribe(() => this._toastrService.success('Request for moving Probe sent.'));
  }

  private patchForm(): void {
    this._formGroup.patchValue({
      x: this._coordinates.x,
      y: this._coordinates.y,
      z: this._coordinates.z,
    });
  }
}
