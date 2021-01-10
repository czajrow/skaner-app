import { Component, Input, OnInit } from '@angular/core';
import { IParameters } from "../../core/api/types";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
})
export class PlotComponent implements OnInit {

  public _formGroup: FormGroup;
  public _zValues: number[] = [];
  public _fValues: number[] = [];
  private _resultData: [][][][];

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) {
    this._formGroup = this._formBuilder.group({
      z: [0],
      f: [0],
    });

    this._formGroup.valueChanges.subscribe(form => {
      this.setPlotData(form.z, form.f);
    });
  }

  @Input() set data(data: { result: [][][][], parameters: IParameters }) {
    if (data) {
      // console.log('AAA', data);
      this._resultData = data.result; // f, z, x, y
      // this._data[0].x = data[0][0].map(val => 'x' + val);
      // this._data[0].y = data[0][0][0].map(val => 'y' + val);
      const params = data.parameters;
      const xCount = this._resultData[0][0].length;
      const yCount = this._resultData[0][0][0].length;
      const zCount = this._resultData[0].length;
      const fCount = this._resultData.length;
      const x = [];
      const y = [];
      for (let i = 0; i < xCount; i++) {
        x.push(params.minX + i * params.stepX);
      }
      for (let i = 0; i < yCount; i++) {
        y.push(params.minY + i * params.stepY);
      }
      for (let i = 0; i < zCount; i++) {
        this._zValues.push(params.minZ + i * params.stepZ);
      }
      for (let i = 0; i < fCount; i++) {
        this._fValues.push(params.minFrequency + i * params.stepFrequency);
      }
      this._data[0].x = x;
      this._data[0].y = y;
      // this._data[0].z = result[0][0];
      this.setPlotData(0, 0);
    }
  }

  // @Input() set params(data: IParameters) {
  //   if (data) {
  //     this._data[0].x = data[0][0].ma;
  //   }
  // }

  public _data = [
    {
      z: [
        // [8.83, 8.89, 8.81, 8.87, 8.9, 8.87],
        // [8.89, 8.94, 8.85, 8.94, 8.96, 8.92],
        // [8.84, 8.9, 8.82, 8.92, 8.93, 8.91],
        // [8.79, 8.85, 8.79, 8.9, 8.94, 8.92],
        // [8.79, 8.88, 8.81, 8.9, 8.95, 8.92],
        // [8.8, 8.82, 8.78, 8.91, 8.94, 8.92],
        // [8.75, 8.78, 8.77, 8.91, 8.95, 8.92],
        // [8.8, 8.8, 8.77, 8.91, 8.95, 8.94],
        // [8.74, 8.81, 8.76, 8.93, 8.98, 8.99],
        // [8.89, 8.99, 8.92, 9.1, 9.13, 9.11],
        // [8.97, 8.97, 8.91, 9.09, 9.11, 9.11],
        // [9.04, 9.08, 9.05, 9.25, 9.28, 9.27],
        // [9, 9.01, 9, 9.2, 9.23, 9.2],
        // [8.99, 8.99, 8.98, 9.18, 9.2, 9.19],
        // [8.93, 8.97, 8.97, 9.18, 9.2, 9.18]
      ],
      x: [],
      y: [],
      type: 'heatmap',
      marker: { color: 'red' },
    },
  ];

  public _layout = {
    title: 'Scan Results [dBm]',
    autosize: true,
    width: 500,
    height: 500,
    yaxis: {
      automargin: true,
      title: {
        text: 'Y value [mm]',
        standoff: 40
      }},
    xaxis: {
      automargin: true,
      title: {
        text: 'X value [mm]',
        standoff: 20
      }},
    // margin: {
    //   l: 65,
    //   r: 50,
    //   b: 65,
    //   t: 90,
    // }
  };

  private setPlotData(z: number, f: number): void {
    this._data[0].z = this._resultData[f][z];
  }
  ngOnInit(): void {
  }

}
