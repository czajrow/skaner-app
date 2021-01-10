"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.SCANNER = void 0;
var types_1 = require("./types");
var probe_1 = require("./probe");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var noise_1 = require("@trinkets/noise");
var random_1 = require("@trinkets/random");
var perlin2 = noise_1.factories.perlin({
    // function() that, when called, returns an assumed random number between 0 and 1,
    // per the definition of Math.random. Here we use the one from @trinkets/random.
    random: random_1.random,
    // Jitter offsets the zero of the surflet from integer values of x, y.
    // False to turn off jitter (default is true).
    jitter: false
});
var Scanner = /** @class */ (function () {
    function Scanner() {
        this._scanningPointsNum = 100;
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
        this._scanningPointsNum = Scanner.calculateScanningTime(params);
        this._params = params;
        rxjs_1.interval(100).pipe(operators_1.take(this._scanningPointsNum), operators_1.finalize(function () {
            var arr = [];
            var dim = 10;
            for (var i = 0; i < dim; i++) {
                arr[i] = [];
                for (var j = 0; j < 1; j++) { // one Z
                    arr[i][j] = [];
                    for (var k = 0; k < 10 * dim; k++) {
                        arr[i][j][k] = [];
                        for (var l = 0; l < 15 * dim; l++) {
                            // arr[i][j][k][l] = Math.random();
                            var zoom = 60;
                            arr[i][j][k][l] = perlin2(k / zoom, l / zoom) + 0.5;
                        }
                    }
                }
            }
            _this._result = {
                parameters: _this._params,
                result: arr
            };
            _this._scanStatus.next({
                scannerStatus: types_1.ScannerStatus.Done,
                progress: null
            });
        })).subscribe(function (count) {
            var progress = {
                done: count,
                total: _this._scanningPointsNum
            };
            if (count > 0.8 * _this._scanningPointsNum) {
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
    Scanner.prototype.getParameters = function () {
        return __assign({}, this._params);
    };
    Scanner.prototype.getStatus = function () {
        return this._scanStatus.value;
    };
    Scanner.prototype.getResult = function () {
        var result = __assign({}, this._result);
        this._result = null;
        this._scanStatus.next({ scannerStatus: types_1.ScannerStatus.Connected, progress: null });
        return result;
    };
    Scanner.calculateScanningTime = function (params) {
        var x = Math.floor((params.maxX - params.minX) / params.stepX) + 1;
        var y = Math.floor((params.maxY - params.minX) / params.stepX) + 1;
        var z = Math.floor((params.maxZ - params.minZ) / params.stepZ) + 1;
        var n = x * y * z;
        return Math.floor(n / 1000);
    };
    return Scanner;
}());
exports.SCANNER = new Scanner();
