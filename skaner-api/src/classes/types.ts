export interface ICoordinates {
    x: number;
    y: number;
    z: number;
}

export interface IProbe {
    moveProbe: (coordinates: ICoordinates) => void;
    getCoordinates: () => ICoordinates;
}

export interface IScanner extends IProbe {

}
