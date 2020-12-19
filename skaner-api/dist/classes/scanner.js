"use strict";
exports.__esModule = true;
exports.SCANNER = void 0;
var probe_1 = require("./probe");
var Scanner = /** @class */ (function () {
    function Scanner() {
        this._probe = probe_1.PROBE;
    }
    Scanner.prototype.moveProbe = function (coordinates) {
        probe_1.PROBE.moveProbe(coordinates);
    };
    Scanner.prototype.getCoordinates = function () {
        return probe_1.PROBE.getCoordinates();
    };
    return Scanner;
}());
exports.SCANNER = new Scanner();
