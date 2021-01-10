import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from '@/core/services/status.service';
import { CurrentScanClient } from '@/core/api/api-clients';
import { Router } from "@angular/router";

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.scss']
})
export class ScanningComponent implements OnInit {

  public _errors: Set<string> = new Set<string>();
  public _formGroup: FormGroup;

  constructor(
    public readonly _statusService: StatusService,
    private readonly _formBuilder: FormBuilder,
    private readonly _currentScanClient: CurrentScanClient,
    private readonly _router: Router,
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
      name: 'Scan 1',
      minX: 100,
      maxX: 200,
      stepX: 1,
      minY: 200,
      maxY: 350,
      stepY: 1,
      minZ: 15,
      maxZ: 20,
      stepZ: 5,
      minFrequency: 10,
      maxFrequency: 20,
      stepFrequency: 1,
    });
  }


  public onSubmit(): void {
    this._currentScanClient.startScan(this._formGroup.value).subscribe();
    this.onDismiss();
    this._router.navigate(['current-scan']);
  }

}
