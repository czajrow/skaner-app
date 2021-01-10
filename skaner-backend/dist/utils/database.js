"use strict";
exports.__esModule = true;
exports.Database = void 0;
var mongodb_1 = require("mongodb");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.connect = function () {
        var _this = this;
        return rxjs_1.from(mongodb_1.MongoClient.connect('mongodb://db:27017/scanner-app')).pipe(operators_1.catchError(function (error) {
            console.log(error);
            throw error;
        }), operators_1.tap(function (client) {
            console.log('Connected to DB!');
            _this._db = client.db();
        }), operators_1.map(function (client) { return null; }));
    };
    Database.prototype.getDb = function () {
        if (!this._db) {
            throw 'No database connection!';
        }
        return this._db;
    };
    Database.prototype.getObjectId = function (id) {
        return new mongodb_1.ObjectId(id);
    };
    return Database;
}());
exports.Database = Database;
