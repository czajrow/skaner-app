import { Component, OnInit } from '@angular/core';
import { ScansService } from '../../core/services/scans.service';

@Component({
  selector: 'app-scans',
  templateUrl: './scans.component.html',
  styleUrls: ['./scans.component.scss']
})
export class ScansComponent implements OnInit {

  constructor(
    public readonly _scansService: ScansService,
  ) { }

  ngOnInit(): void {
  }

}
