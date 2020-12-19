"use strict";
exports.__esModule = true;
exports.SCANNER = void 0;
var types_1 = require("./types");
var probe_1 = require("./probe");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Scanner = /** @class */ (function () {
    function Scanner() {
        this._probe = probe_1.PROBE;
        this._scanStatus = new rxjs_1.BehaviorSubject({ scannerStatus: types_1.ScannerStatus.Connected, progress: null });
    }
    Scanner.prototype.moveProbe = function (coordinates) {
        probe_1.PROBE.moveProbe(coordinates);
    };
    Scanner.prototype.getProbeCoordinates = function () {
        return probe_1.PROBE.getCoordinates();
    };
    Scanner.prototype.scan = function (params) {
        var _this = this;
        if (this._scanStatus.value.scannerStatus !== types_1.ScannerStatus.Connected) {
            return;
        }
        this._params = params;
        rxjs_1.interval(200).pipe(operators_1.take(100), operators_1.finalize(function () {
            _this._result = {
                parameters: _this._params,
                result: 'This is result of the scan'
            };
            _this._scanStatus.next({
                scannerStatus: types_1.ScannerStatus.Done,
                progress: null
            });
        })).subscribe(function (count) {
            var progress = {
                done: count,
                total: 100
            };
            if (count > 80) {
                _this._scanStatus.next({
                    scannerStatus: types_1.ScannerStatus.Postprocessing,
                    progress: progress
                });
            }
            else {
                _this._scanStatus.next({
                    scannerStatus: types_1.ScannerStatus.Scanning,
                    progress: progress
                });
            }
        });
    };
    Scanner.prototype.getStatus = function () {
        return this._scanStatus.value;
    };
    Scanner.prototype.getResult = function () {
        var result = this._result;
        this._result = null;
        this._scanStatus.next({ scannerStatus: types_1.ScannerStatus.Connected, progress: null });
        return result;
    };
    return Scanner;
}());
exports.SCANNER = new Scanner();
