"use strict";
exports.__esModule = true;
exports.PROBE = void 0;
var Probe = /** @class */ (function () {
    function Probe(_x, _y, _z) {
        this._x = _x;
        this._y = _y;
        this._z = _z;
        this._x = _x || 230.5;
        this._y = _y || 127.0;
        this._z = _z || 56.5;
    }
    Probe.prototype.moveProbe = function (coordinates) {
        this._x = coordinates.x;
        this._y = coordinates.y;
        this._z = coordinates.z;
    };
    Probe.prototype.getCoordinates = function () {
        return {
            x: this._x,
            y: this._y,
            z: this._z
        };
    };
    return Probe;
}());
exports.PROBE = new Probe();
