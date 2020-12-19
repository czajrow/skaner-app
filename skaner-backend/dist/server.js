"use strict";
exports.__esModule = true;
var express = require("express");
var probe_1 = require("./classes/probe");
var app = express();
app.get('/', function (req, res) {
    // body: none
    // response: { value: string } as JSON
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.send({ value: 'Hello, World!' });
});
app.get('/api/probe', function (req, res) {
    // body: none
    // response: ICoordinates as JSON
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.send(probe_1.PROBE.getCoordinates());
});
app.put('/api/probe', function (req, res) {
    // body: ICoordinates as JSON
    // response: success: boolean
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('req.body', req.body);
    res.status(200);
    res.send({ success: true });
});
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
