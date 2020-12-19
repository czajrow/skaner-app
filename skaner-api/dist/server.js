"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var scanner_1 = require("./classes/scanner");
var app = express();
var jsonParser = bodyParser.json();
app.use(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.next();
});
app.get('/api/probe', function (req, res) {
    // body: none
    // response: ICoordinates as JSON
    res.status(200);
    res.send(scanner_1.SCANNER.getProbeCoordinates());
});
app.put('/api/probe', jsonParser, function (req, res) {
    // body: ICoordinates as JSON
    // response: { success: boolean }
    scanner_1.SCANNER.moveProbe(req.body);
    res.status(200);
    res.send({ success: true });
});
app.post('/api/parameters', jsonParser, function (req, res) {
    // body: ICoordinates as JSON
    // response: { success: boolean }
    scanner_1.SCANNER.scan(req.body);
    res.status(200);
    res.send({ success: true });
});
app.get('/api/status', function (req, res) {
    // body: none
    // response: ICoordinates as JSON
    res.status(200);
    res.send({ status: scanner_1.SCANNER.getStatus() });
});
app.get('/api/result', function (req, res) {
    // body: none
    // response: ICoordinates as JSON
    var result = scanner_1.SCANNER.getResult();
    if (!!result) {
        res.status(200);
        res.send(result);
    }
    else {
        res.status(404);
        res.send({ error: 'You have to finish scan before downloading results.' });
    }
});
var port = 3001;
app.listen(port, function () { return console.log("App listening on port " + port + "!"); });
