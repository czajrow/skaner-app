import express = require("express");
import request = require('request');
import bodyParser = require('body-parser');
import { Database } from "./utils/database";
import { from, Subject } from "rxjs";
import { first, switchMap } from "rxjs/operators";
import cors = require('cors')
import { IParameters, IResult, ScannerStatus } from './classes/types'

const BASE_API_URL = 'http://api:3001/api'

const app = express();
const database = new Database();
const jsonParser = bodyParser.json();

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

app.get('/api/probe', (req, res) => {
    // body: none
    // response: ICoordinates as JSON
    const url = BASE_API_URL + '/probe';
    const subject = new Subject<any>();
    subject.asObservable().pipe(first()).subscribe(response => {
        if (response.err) {
            res.status(500);
            res.send(response.err);
        } else {
            res.status(200);
            res.send(response.body);
        }
    })
    request({ url, method: 'GET', json: true }, (err, res, body) => {
        subject.next({ err, body })
    });
});

app.put('/api/probe', jsonParser, (req, res) => {
    // body: ICoordinates as JSON
    // response: { success: boolean }
    const url = BASE_API_URL + '/probe';
    const subject = new Subject<any>();
    subject.asObservable().pipe(first()).subscribe(response => {
        if (response.err) {
            res.status(500);
            res.send(response.err);
        } else {
            res.status(200);
            res.send(response.body);
        }
    })
    request({ url, method: 'PUT', json: req.body }, (err, res, body) => {
        subject.next({ err, body })
    });
});

app.post('/api/parameters', jsonParser, (req, res) => {
    // body: IParameters as JSON
    // response: { success: boolean }
    const params: IParameters = req.body;

    const url = BASE_API_URL + '/parameters';
    const subject = new Subject<any>();
    subject.asObservable().pipe(first()).subscribe(response => {
        if (response.err) {
            res.status(500);
            res.send(response.err);
        } else {
            res.status(200);
            res.send(response.body);
        }
    })
    request({ url, method: 'POST', json: req.body }, (err, res, body) => {
        subject.next({ err, body })
    });
});

app.get('/api/status', (req, res) => {
    // body: none
    // response: IScanStatus as JSON
    const url = BASE_API_URL + '/status';
    const subject = new Subject<any>();
    subject.asObservable().pipe(first()).subscribe(response => {
        if (response.err) {
            res.status(500);
            res.send(response.err);
        } else {
            res.status(200);
            res.send(response.body);
        }
    })
    request({ url: url, method: 'GET', json: true }, (err, res, body) => {
        const status: ScannerStatus = body.status.scannerStatus;
        if (status === ScannerStatus.Done) {
            const resultUrl = BASE_API_URL + '/result';
            request({ url: resultUrl, method: 'GET', json: true }, (errr, ress, bodyy) => {
                const scan: IResult = bodyy;
                const db = database.getDb();
                from(db.collection('scans').insertOne(scan)).subscribe();
            });
        }
        subject.next({ err, body })
    });
});

app.get('/api/results', (req, res) => {
    const db = database.getDb();
    from(db.collection('scans').find().toArray()).subscribe((scans: []) => {
        res.status(200);
        res.send({ scans });
    });
});

const port = 3000;
database.connect().subscribe(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`));
});
