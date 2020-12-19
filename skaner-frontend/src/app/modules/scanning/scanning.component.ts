import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScanningService } from '@/core/services/scanning.service';
import { ScansService } from '@/core/services/scans.service';
import { StatusOfConnection, StatusService } from '../../core/services/status.service';
import { TestApiService } from '../../core/api/test-api.service';

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.scss']
})
export class ScanningComponent implements OnInit {

  public _errors: Set<string> = new Set<string>();
  public _formGroup: FormGroup;
  public _statusOfConnection = StatusOfConnection;

  constructor(
    public readonly _statusService: StatusService,
    private readonly _formBuilder: FormBuilder,
    private readonly _scansService: ScansService,
    private readonly _scanningService: ScanningService,
    private readonly _testApiService: TestApiService,
  ) {
    this._formGroup = this._formBuilder.group({
      name: [null, Validators.required],
      minX: [null, Validators.required],
      maxX: [null, Validators.required],
      stepX: [null, Validators.required],
      minY: [null, Validators.required],
      maxY: [null, Validators.required],
      stepY: [null, Validators.required],
      minZ: [null, Validators.required],
      maxZ: [null, Validators.required],
      stepZ: [null, Validators.required],
      minFrequency: [null, Validators.required],
      maxFrequency: [null, Validators.required],
      stepFrequency: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public onDismiss(): void {
    this._testApiService.test();
    this._formGroup.patchValue({
      name: null,
      minX: null,
      maxX: null,
      stepX: null,
      minY: null,
      maxY: null,
      stepY: null,
      minZ: null,
      maxZ: null,
      stepZ: null,
      minFrequency: null,
      maxFrequency: null,
      stepFrequency: null,
    });
  }

  public onFillForm(): void {
    this._formGroup.patchValue({
      name: 'Test name',
      minX: 100,
      maxX: 200,
      stepX: 1,
      minY: 200,
      maxY: 300,
      stepY: 2,
      minZ: 10,
      maxZ: 30,
      stepZ: 1,
      minFrequency: 1,
      maxFrequency: 20,
      stepFrequency: 1,
    });
  }


  public onSubmit(): void {
    this._scanningService.scan();
    this._scansService.addScan(this._formGroup.controls.name.value);
    this.onDismiss();
  }

}
