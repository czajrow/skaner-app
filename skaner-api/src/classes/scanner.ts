import { ICoordinates, IParameters, IProbe, IProgress, IResult, IScanner, IScanStatus, ScannerStatus } from "./types";
import { PROBE } from "./probe";
import { BehaviorSubject, interval } from "rxjs";
import { finalize, take } from "rxjs/operators";

class Scanner implements IScanner {

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
        this._params = params;
        interval(80).pipe(
            take(100),
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
                total: 100,
            }
            if (count > 80) {
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
        console.log('MY-getResult', result);
        return result;
    }
}

export const SCANNER: IScanner = new Scanner();
