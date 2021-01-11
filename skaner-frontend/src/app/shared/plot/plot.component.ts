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
      this._resultData = data.result; // f, z, x, y
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
      this.setPlotData(0, 0);
    }
  }

  public _data = [
    {
      z: [],
      x: [],
      y: [],
      type: 'heatmap',
      marker: { color: 'red' },
    },
  ];

  public _layout = {
    title: 'Scan Results [dBm]',
    autosize: true,
    width: 750,
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
