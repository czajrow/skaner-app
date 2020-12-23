import { ObjectId } from "mongodb";

export interface ICoordinates {
    x: number;
    y: number;
    z: number;
}

export interface IParameters {
    name: string,
    minX: number,
    maxX: number,
    stepX: number,
    minY: number,
    maxY: number,
    stepY: number,
    minZ: number,
    maxZ: number,
    stepZ: number,
    minFrequency: number,
    maxFrequency: number,
    stepFrequency: number,
}

export enum ScannerStatus {
    Scanning = 'Scanning',
    Postprocessing = 'Postprocessing',
    Connected = 'Connected',
    NotConnected = 'NotConnected',
    Done = 'Done',
}

export interface IScanStatus {
    scannerStatus: ScannerStatus;
    progress: IProgress;
}

export interface IProgress {
    done: number;
    total: number;
}

export interface IResult {
    parameters: IParameters;
    result: string;
}

export interface IScanViewModel {
    parameters: IParameters;
    resultId: string;
    creationDate: number;
    _id: string;
}
