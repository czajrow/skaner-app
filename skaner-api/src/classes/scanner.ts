import { ICoordinates, IParameters, IProbe, IProgress, IResult, IScanner, IScanStatus, ScannerStatus } from "./types";
import { PROBE } from "./probe";
import { BehaviorSubject, interval } from "rxjs";
import { finalize, take } from "rxjs/operators";

class Scanner implements IScanner {

    private _scanningPointsNum: number = 100;

    private readonly _probe: IProbe;
    private readonly _scanStatus: BehaviorSubject<IScanStatus>;
    private _params: IParameters;
    private _result: IResult;

    constructor() {
        this._probe = PROBE;
        this._scanStatus = new BehaviorSubject<IScanStatus>({ scannerStatus: ScannerStatus.Connected, progress: null })
    }

    moveProbe(coordinates: ICoordinates): void {
        PROBE.moveProbe(coordinates);
    }

    getProbeCoordinates(): ICoordinates {
        return PROBE.getCoordinates();
    }

    scan(params: IParameters): void {
        if (this._scanStatus.value.scannerStatus !== ScannerStatus.Connected) {
            return;
        }
        this._scanningPointsNum = Scanner.calculateScanningTime(params);
        this._params = params;
        interval(100).pipe(
            take(this._scanningPointsNum),
            finalize(() => {
                this._result = {
                    parameters: this._params,
                    result: 'This is result of the scan' + new Date().valueOf(),
                };
                this._scanStatus.next({
                    scannerStatus: ScannerStatus.Done,
                    progress: null
                });
            }),
        ).subscribe((count: number) => {
            const progress: IProgress = {
                done: count,
                total: this._scanningPointsNum,
            }
            if (count > 0.8 * this._scanningPointsNum) {
                this._scanStatus.next({
                    scannerStatus: ScannerStatus.Postprocessing,
                    progress
                })
            } else {
                this._scanStatus.next({
                    scannerStatus: ScannerStatus.Scanning,
                    progress,
                })
            }
        })
    }

    getParameters(): IParameters {
        return { ...this._params };
    }

    getStatus(): IScanStatus {
        return this._scanStatus.value
    }

    getResult(): IResult {
        const result = { ...this._result };
        this._result = null;
        this._scanStatus.next({ scannerStatus: ScannerStatus.Connected, progress: null });
        return result;
    }
    
    private static calculateScanningTime(params: IParameters): number {
        const x = Math.floor((params.maxX - params.minX) / params.stepX) + 1;
        const y = Math.floor((params.maxY - params.minX) / params.stepX) + 1;
        const z = Math.floor((params.maxZ - params.minZ) / params.stepZ) + 1;

        const n = x * y * z;
        return Math.floor(n / 1000);
    }
}

export const SCANNER: IScanner = new Scanner();
