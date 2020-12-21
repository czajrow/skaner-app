"use strict";
exports.__esModule = true;
var express = require("express");
var request = require("request");
var database_1 = require("./utils/database");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var bodyParser = require("body-parser");
var BASE_URL = 'http://api:3001/api';
var app = express();
var database = new database_1.Database();
var jsonParser = bodyParser.json();
app.use(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.next();
});
app.get('/api', function (req, res) {
    // body: none
    // response: { value: string }
    res.status(200);
    var db = database.getDb();
    rxjs_1.from(db.collection('some_collection').insertOne({ test: true, message: 'this is test' }))
        .pipe(operators_1.switchMap(function (response) { return rxjs_1.from(db.collection('some_collection').find().toArray()); }))
        .subscribe(function (response) {
        res.send({ total: response.length, messages: response.map(function (a) { return a.message; }) });
    });
});
app.get('/api/probe', function (req, res) {
    // body: none
    // response: ICoordinates as JSON
    var url = BASE_URL + '/probe';
    var subject = new rxjs_1.Subject();
    subject.asObservable().pipe(operators_1.first()).subscribe(function (response) {
        if (response.err) {
            res.status(500);
            res.send(response.err);
        }
        else {
            res.status(200);
            res.send(response.body);
        }
    });
    request({ url: url, method: 'GET', json: true }, function (err, res, body) {
        subject.next({ err: err, body: body });
    });
});
app.put('/api/probe', jsonParser, function (req, res) {
    // body: ICoordinates as JSON
    // response: { success: boolean }
    var url = BASE_URL + '/probe';
    var subject = new rxjs_1.Subject();
    subject.asObservable().pipe(operators_1.first()).subscribe(function (response) {
        if (response.err) {
            res.status(500);
            res.send(response.err);
        }
        else {
            res.status(200);
            res.send(response.body);
        }
    });
    request({ url: url, method: 'PUT', json: req.body }, function (err, res, body) {
        subject.next({ err: err, body: body });
    });
});
var port = 3000;
database.connect().subscribe(function () {
    app.listen(port, function () { return console.log("App listening on port " + port + "!"); });
});
