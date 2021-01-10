"use strict";
exports.__esModule = true;
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var cors = require("cors");
var database_1 = require("./utils/database");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var types_1 = require("./classes/types");
var BASE_API_URL = 'http://api:3001/api';
var app = express();
var database = new database_1.Database();
var jsonParser = bodyParser.json();
app.use(cors());
// app.get('/api', (req, res) => {
//     // body: none
//     // response: { value: string }
//     res.status(200);
//     const db = database.getDb();
//     from(db.collection('some_collection').insertOne({ test: true, message: 'this is test' }))
//         .pipe(
//             switchMap(response => from(db.collection('some_collection').find().toArray())),
//         )
//         .subscribe(response => {
//             res.send({ total: response.length, messages: response.map(a => a.message) });
//         });
// });
app.get('/api/probe', function (req, res) {
    // body: none
    // response: ICoordinates as JSON
    var url = BASE_API_URL + '/probe';
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
    var url = BASE_API_URL + '/probe';
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
app.get('/api/parameters', function (req, res) {
    // body: none
    // response: IParameters as JSON
    var url = BASE_API_URL + '/parameters';
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
app.post('/api/parameters', jsonParser, function (req, res) {
    // body: IParameters as JSON
    // response: { success: boolean }
    var params = req.body;
    var url = BASE_API_URL + '/parameters';
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
    request({ url: url, method: 'POST', json: req.body }, function (err, res, body) {
        subject.next({ err: err, body: body });
    });
});
app.get('/api/status', function (req, res) {
    // body: none
    // response: IScanStatus as JSON
    var url = BASE_API_URL + '/status';
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
        var status = body.status.scannerStatus;
        if (status === types_1.ScannerStatus.Done) {
            var resultUrl = BASE_API_URL + '/result';
            request({ url: resultUrl, method: 'GET', json: true }, function (errr, ress, bodyy) {
                var scan = bodyy;
                var db = database.getDb();
                rxjs_1.from(db.collection('results').insertOne({ result: scan.result }))
                    .pipe(operators_1.map(function (data) { return data.insertedId; }), operators_1.switchMap(function (resultId) {
                    return rxjs_1.from(db.collection('scans').insertOne({
                        parameters: scan.parameters,
                        resultId: resultId,
                        creationDate: new Date().valueOf()
                    }));
                })).subscribe();
            });
        }
        subject.next({ err: err, body: body });
    });
});
app.get('/api/scans', function (req, res) {
    var db = database.getDb();
    rxjs_1.from(db.collection('scans').find().toArray()).subscribe(function (scans) {
        res.status(200);
        res.send(scans);
    });
});
app["delete"]('/api/scan/:scanId', function (req, res) {
    var id = req.params.scanId;
    var db = database.getDb();
    var objId = database.getObjectId(id);
    rxjs_1.from(db.collection('scans').findOneAndDelete({ "_id": objId }))
        .pipe(operators_1.switchMap(function (scan) {
        var resultId = scan.resultId;
        var resObjId = database.getObjectId(resultId);
        return rxjs_1.from(db.collection('results').findOneAndDelete({ "_id": resObjId }));
    }))
        .subscribe(function () {
        res.status(200);
        res.send({ id: id });
    }, function (error) {
        res.status(404);
        res.send({ error: error });
    });
});
app.get('/api/result/:resultId', function (req, res) {
    var id = req.params.resultId;
    var db = database.getDb();
    var objId = database.getObjectId(id);
    rxjs_1.from(db.collection('results').findOne({ "_id": objId }))
        .subscribe(function (scan) {
        res.status(200);
        res.send(scan);
    }, function (error) {
        res.status(404);
        res.send({ error: error });
    });
});
app.get('/api/scan/:scanId', function (req, res) {
    var id = req.params.scanId;
    var db = database.getDb();
    var objId = database.getObjectId(id);
    rxjs_1.from(db.collection('scans').findOne({ "_id": objId }))
        .subscribe(function (scan) {
        res.status(200);
        res.send(scan);
    }, function (error) {
        res.status(404);
        res.send({ error: error });
    });
});
var port = 3000;
database.connect().subscribe(function () {
    app.listen(port, function () { return console.log("App listening on port " + port + "!"); });
});
