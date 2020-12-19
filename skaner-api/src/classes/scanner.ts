import { ICoordinates, IProbe, IScanner } from "./types";
import { PROBE } from "./probe";

class Scanner implements IScanner {

    private readonly _probe: IProbe;

    constructor() {
        this._probe = PROBE;
    }

    moveProbe(coordinates: ICoordinates): void {
        PROBE.moveProbe(coordinates);
    }

    getCoordinates(): ICoordinates {
        return PROBE.getCoordinates();
    }
}

export const SCANNER: IProbe = new Scanner();
