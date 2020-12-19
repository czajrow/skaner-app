export interface ICoordinates {
    x: number;
    y: number;
    z: number;
}

export interface IProbe {
    moveProbe: (coordinates: ICoordinates) => void;
    getCoordinates: () => ICoordinates;
}

class Probe implements IProbe {

    constructor(
        private _x?: number,
        private _y?: number,
        private _z?: number,
    ) {
        this._x = _x || 230.5;
        this._y = _y || 127.0;
        this._z = _z || 56.5;
    }

    moveProbe(coordinates: ICoordinates): void {
        this._x = coordinates.x;
        this._y = coordinates.y;
        this._z = coordinates.z;
    }

    getCoordinates(): ICoordinates {
        return {
            x: this._x,
            y: this._y,
            z: this._z,
        };
    }
}

export const PROBE: IProbe = new Probe();
